import { useState } from "react";
import type { ReactElement } from 'react'
import Layout from '../../components/layout'
import { ShuffleIcon } from "@radix-ui/react-icons"
import { Theme, Flex, Text, Button, Box, Card, Spinner, IconButton } from "@radix-ui/themes";
import { NextPageWithLayout } from "../_app";
import { amber, cyan } from '@radix-ui/colors';

type Question = {
    title: string;
    level: string;
};

const QuizCardPage: NextPageWithLayout = () => {
    const [jsQuestion, setJsQuestion] = useState("");
	const [reactQuestion, setReactQuestion] = useState("");
	const [loadingJs, setLoadingJs] = useState(false);
	const [loadingReact, setLoadingReact] = useState(false);


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

	return (
        <Flex gap="5" direction="column" mt="5">
            <Flex justify={'center'}>
                <Button size="2" radius="large" variant="soft" onClick={generateQuestions} loading={loadingJs || loadingReact} style={{display:'flex'}}>
                    <ShuffleIcon /> Generate questions
                </Button>
            </Flex>
            <Flex gap="3" direction="row" className="quiz-card-wrap">
                <Card style={{ backgroundColor: amber.amber4, flex:1, maxHeight: '300px' }}>
                    <Flex gap="4" align="center" direction="column" >
                        <Text as="p" weight="bold">
                            JS Question:
                        </Text>
                        <Text as="p" color="gray" align={'center'}>
                            {loadingJs ? (
                                <Spinner/>
                            ) :jsQuestion}
                        </Text>
                    </Flex>
                </Card>
                <Card style={{ backgroundColor: cyan.cyan6, flex:1, maxHeight: '300px' }}>
                    <Flex gap="4" align="center" direction="column">
                        <Text as="p" weight="bold">
                            React Question:
                        </Text>
                        <Text as="p" color="gray" align={'center'}>
                            {loadingReact ? (
                                <Spinner/>
                            ) :reactQuestion}
                        </Text>
                        
                    </Flex>
                </Card>
            </Flex>
        </Flex>
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
// function QuizCard() {
// 	const [jsQuestion, setJsQuestion] = useState("");
// 	const [reactQuestion, setReactQuestion] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const generateQuestions = async () => {
// 		setLoading(true);
// 		const jsResponse = await fetch('./js-quiz.json');
// 		const jsData = await jsResponse.json();
// 		setJsQuestion(jsData.highPriority);

// 		const reactResponse = await fetch('./react-quiz.json');
// 		const reactData = await reactResponse.json();
// 		setReactQuestion(reactData);
// 		setLoading(false);
// 	};

// 	return (
//         <Flex gap="3" direction="column">
//             <Button onClick={generateQuestions}>
//                 <ShuffleIcon /> Generate questions
//             </Button>
//             {loading ? (
//                 <Text>Loading...</Text>
//             ) : (
//                 <>
//                     <Box width="400px" style={{ backgroundColor: 'js-yellow' }}>
//                         <Card size="2">
//                             <Flex gap="4" align="center">
//                                 <Box>
//                                     <Text as="p" weight="bold">
//                                         JS Question:
//                                     </Text>
//                                     <Text as="p" color="gray">
//                                         {jsQuestion}
//                                     </Text>
//                                 </Box>
//                             </Flex>
//                         </Card>
//                     </Box>
//                     <Box width="400px" style={{ backgroundColor: 'react-blue' }}>
//                         <Card size="2">
//                             <Flex gap="4" align="center">
//                                 <Box>
//                                     <Text as="p" weight="bold">
//                                         React Question:
//                                     </Text>
//                                     <Text as="p" color="gray">
//                                         {reactQuestion}
//                                     </Text>
//                                 </Box>
//                             </Flex>
//                         </Card>
//                     </Box>
//                 </>
//             )}
//         </Flex>
// 	);
// }
