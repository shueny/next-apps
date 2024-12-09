// use Next.js and Radix UI for the Question Card
// use the QuestionCard component to display the question
// click card will flip the card to the back
// if you haven't answered the question, there will be a textarea to answer the question by markdown
// if you have answered the question, the textarea will be replaced by the answer
// the answer will be displayed in markdown format
// there will be a button to edit the answer
// clip the card will flip the card front
// one time will generate two cards
// one card will be displayed one js-quiz question and one react quiz question
// the question is from the 'js-quiz.json' file and 'react-quiz.json' file
// 

import { useState } from 'react';
import { QuestionCard } from '@radix-ui/react-card';
import { Textarea } from '@radix-ui/react-textarea';
import { Button } from '@radix-ui/react-button';
import ReactMarkdown from 'react-markdown';

export default function QuestionCardComponent({ question }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [answer, setAnswer] = useState(question.answer);
    
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    
    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };
    
    const handleEditAnswer = () => {
        // handle edit answer
    }   

    return (
        <QuestionCard flipped={isFlipped} onFlipChange={handleFlip}>
            <QuestionCard.Front>
                <h3>{question.question}</h3>
                <Button onClick={handleFlip}>Answer</Button>
            </QuestionCard.Front>
            <QuestionCard.Back>
                <ReactMarkdown>{answer}</ReactMarkdown>
                <Button onClick={handleEditAnswer}>Edit</Button>
            </QuestionCard.Back>
        </QuestionCard>
    );
}




