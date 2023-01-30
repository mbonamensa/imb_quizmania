import { decode } from "html-entities"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AnswerOption from "./AnswerOption"
import { nanoid } from "nanoid"




function Quiz(props) {
   
    // console.log(props.allAnswers)
    
    const answerElements = props.allAnswers.map(answer => {
        return <AnswerOption 
            key={answer.id}
            value={decode(answer.answerValue)}
            selectedAnswer={() => props.selectedAnswer(answer.id, props.quizId)}
            selected={answer.isSelected}
            isCorrect={answer.isCorrect}
            endGame={props.endGame}
        />
    })

    return (
        <>
        <div className="quiz">
        <h2>{props.loading ? <Skeleton /> : decode(props.question)}</h2>
            <div className="answer-options">
                {props.loading ? <Skeleton width={150} height={30} count={4} borderRadius={10} containerClassName="answers-skeleton" /> : answerElements}
            </div>
        </div>
        {props.loading ? <Skeleton height={2}/> : <hr />}
        </>
    )
}

export default Quiz