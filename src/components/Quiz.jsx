import { decode } from "html-entities"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AnswerOption from "./AnswerOption"




function Quiz(props) {
    
    const answerElements = props.allAnswers.map(answer => {
        return <AnswerOption 
            key={answer.id}
            value={decode(answer.answerValue)}
            selectedAnswer={() => props.selectedAnswer(answer.id, props.quizId)}
            selected={answer.isSelected}
            isCorrect={answer.isCorrect}
            endQuiz={props.endQuiz}
            darkmode={props.darkmode}
        />
    })


    return (
        <>
        <div className="quiz">
            <h2>
                {
                props.loading ? 
                <Skeleton 
                baseColor={props.darkmode ? "#353536" : "#ebebeb"} 
                highlightColor={props.darkmode ? "#403e3e" : "#f5f5f5"}
                className="skeleton"
                /> 
                : decode(props.question)
                }
            </h2>
            <div className="answer-options">
                {
                props.loading ? 
                <Skeleton 
                width={150} 
                height={30} 
                count={4} 
                borderRadius={10} 
                baseColor={props.darkmode ? "#353536" : "#ebebeb"} 
                highlightColor={props.darkmode ? "#403e3e" : "#f5f5f5"}
                containerClassName="answers-skeleton" 
                className="skeleton"
                /> 
                : answerElements
                }
            </div>
        </div>
        {props.loading ? <Skeleton 
        height={2}
        baseColor={props.darkmode ? "#353536" : "#ebebeb"} 
        highlightColor={props.darkmode ? "#403e3e" : "#f5f5f5"}
        /> : <hr />}
        </>
    )
}

export default Quiz