import { useRef, useState, useEffect } from "react";
import type { ReactElement } from 'react'
import Layout from '../../components/layout'
import { ShuffleIcon,ChatBubbleIcon, InfoCircledIcon,ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Theme, Flex, Text, Button, Box, Card, Spinner, Popover, Callout } from "@radix-ui/themes";
import { NextPageWithLayout } from "../_app";
import { amber, cyan } from '@radix-ui/colors';
import './styles.css';
import MarkdownIt from 'markdown-it';
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

type Question = {
    title: string;
    level: string;
};

const mdParser = new MarkdownIt();

const QuizCardPage: NextPageWithLayout = () => {
    const [jsQuestion, setJsQuestion] = useState("");
	const [reactQuestion, setReactQuestion] = useState("");
	const [loadingJs, setLoadingJs] = useState(false);
	const [loadingReact, setLoadingReact] = useState(false);
	const [flippedJs, setFlippedJs] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('');
    const [calloutMessage, setCalloutMessage] = useState('');
    const [calloutType, setCalloutType] = useState<'success' | 'error' | null>(null);
    const [showCallout, setShowCallout] = useState(false);

    const mdEditorJS = useRef(null);
    const [jsAnswer, setJsAnswer] = useState('');
    const mdEditorReact = useRef(null);
    const [reactAnswer, setReactAnswer] = useState('');

	const generateQuestions = async () => {
		setLoadingJs(true);
		setLoadingReact(true);
		
		// Fetch JS questions
		const jsResponse = await fetch('./quiz-card/js-quiz.json');
		const jsData: Question[] = await jsResponse.json();
		const randomJsQuestion = jsData[Math.floor(Math.random() * jsData.length)];
		// const highPriorityJsQuestions = jsData.filter((q: Question) => q.level === "High");
		// const randomJsQuestion = highPriorityJsQuestions[Math.floor(Math.random() * highPriorityJsQuestions.length)].title;
		setJsQuestion(randomJsQuestion.title);
		setLoadingJs(false);

		// Fetch React questions
		const reactResponse = await fetch('./quiz-card/react-quiz.json');
		const reactData = await reactResponse.json();
		const randomReactQuestion = reactData[Math.floor(Math.random() * reactData.length)];
		setReactQuestion(randomReactQuestion);
		
		setLoadingReact(false);
	};

    const handleEditorJsChange=({ html, text }: { html: string, text: string })=> {
        const newValue = text.replace(/\d/g, "");
        setJsAnswer(newValue);
      }

    const handleEditorReactChange=({ html, text }: { html: string, text: string })=> {
        const newValue = text.replace(/\d/g, "");
        setReactAnswer(newValue);
      }

    const handleSave = async (jsAnswer: string, question: string, type: 'js'|'react') => {
        const content = `# Question\n${question}\n\nType: ${type === 'js'? 'JS': 'React'}\n\n## Answer\n${jsAnswer}`;
        const response = await fetch('./api/saveFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            const error = await response.json();
            setCalloutMessage(`Error saving file: ${error.error}`);
            setCalloutType('error');
            setShowCallout(true);
            setTimeout(() => setShowCallout(false), 1500);
        } else {
            setCalloutMessage('File saved successfully');
            setCalloutType('success');
            // Fetch the answers.md content again after saving
            const fetchMarkdown = async () => {
                const response = await fetch('./api/getAnswers');
                const data = await response.json();
                setMarkdownContent(data.content);
            };
            fetchMarkdown();
            setShowCallout(true);
            setTimeout(() => setShowCallout(false), 1000);
        }
    };

    // Fetch the answers.md file when the component mounts
    useEffect(() => {
        const fetchMarkdown = async () => {
            const response = await fetch('./api/getAnswers');
            const data = await response.json();
            setMarkdownContent(data.content);
        };
        fetchMarkdown();
    }, []);
	return (
        <>
        <Flex gap="5" direction="column" mt="5">
            {showCallout && calloutMessage && (
                <Callout.Root className="alert-message" color={calloutType === 'success' ? 'cyan' : 'red'}>
                    <Callout.Icon>
                        {calloutType === 'success'? <InfoCircledIcon />: <ExclamationTriangleIcon/>}
                    </Callout.Icon>
                    <Callout.Text>
                        {calloutMessage}
                    </Callout.Text>
                </Callout.Root>
            )}
            <Flex gap="5" direction="column" mt="5">
                <Flex justify={'center'}>
                    <Button size="2" radius="large" variant="soft" onClick={generateQuestions} loading={loadingJs || loadingReact} style={{display:'flex'}}>
                        <ShuffleIcon /> Generate questions
                    </Button>
                </Flex>
                <Flex gap="3" direction="row" className="quiz-card-wrap">
                    <Card 
                        className={`card ${flippedJs ? 'flipped' : ''}`} 
                        style={{ backgroundColor: amber.amber4, flex:1, minHeight: '200px', maxHeight: '60vh' }}
                    >
                        <Flex gap="4" justify={'between'} direction="column" style={{height: '100%'}}>
                            <Flex gap="4" align="center" direction="column">
                                <Text as="p" weight="bold">JS Question:</Text>
                                <Text as="p" color="gray" align={'center'}>
                                    {loadingJs ? <Spinner/> : jsQuestion}
                                </Text>
                            </Flex>
                            {jsQuestion && <Popover.Root>
                                <Popover.Trigger>
                                    <Button variant="soft">
                                        <ChatBubbleIcon width="16" height="16" />
                                        Edit answer
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content width="360px">
                                    <Flex gap="3">
                                        <Box flexGrow="1">
                                            <Editor
                                                ref={mdEditorJS}
                                                value={jsAnswer}
                                                style={{
                                                    height: "300px",
                                                    overflow: "scroll",
                                                }}
                                                onChange={handleEditorJsChange}
                                                view={{ menu: true, md: true, html: false }}
                                                renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
                                            />
                                            <Flex gap="3" mt="3" justify="between">
                                                <Popover.Close>
                                                    <Button size="1" onClick={() => handleSave(jsAnswer, jsQuestion, 'js')}>Save</Button>
                                                </Popover.Close>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Popover.Content>
                            </Popover.Root>}
                        </Flex>
                    </Card>
                    <Card 
                        className={`card ${flippedJs ? 'flipped' : ''}`} 
                        style={{ backgroundColor: cyan.cyan4, flex:1, minHeight: '200px', maxHeight: '60vh' }}
                    >
                        <Flex gap="4" justify={'between'} direction="column" style={{height: '100%'}}>
                            <Flex gap="4" align="center" direction="column">
                                <Text as="p" weight="bold">React Question:</Text>
                                <Text as="p" color="gray" align={'center'}>
                                    {loadingJs ? <Spinner/> : reactQuestion}
                                </Text>
                            </Flex>
                            {reactQuestion && <Popover.Root>
                                <Popover.Trigger>
                                    <Button variant="soft" color="cyan">
                                        <ChatBubbleIcon width="16" height="16" />
                                        Edit answer
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content width="360px">
                                    <Flex gap="3">
                                        <Box flexGrow="1">
                                            <Editor
                                                ref={mdEditorReact}
                                                value={reactAnswer}
                                                style={{
                                                    height: "300px",
                                                    overflow: "scroll",
                                                }}
                                                onChange={handleEditorReactChange}
                                                view={{ menu: true, md: true, html: false }}
                                                renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
                                            />
                                            <Flex gap="3" mt="3" justify="between">
                                                <Popover.Close>
                                                    <Button color="cyan" size="1" onClick={() => handleSave(reactAnswer, reactQuestion, 'react')}>Save</Button>
                                                </Popover.Close>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Popover.Content>
                            </Popover.Root>}
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </Flex>
        </>
	);
}

QuizCardPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    )
}


export default QuizCardPage; 