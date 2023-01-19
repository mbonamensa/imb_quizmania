import { decode } from "html-entities"
import AnswerOption from "./AnswerOption"
import { nanoid } from "nanoid"




function Quiz(props) {
//    const styles = {
//         // backgroundColor: props.selected ? "#448FA3" : "none",
//     }

    // const Option = ({ value, styles, selectAnswer }) => {
    //     return (
    //         <button style={styles} onClick={selectAnswer}>{value}</button>
    //     )
    // }

    const answers = [...props.incorrectAnswers, props.correctAnswer]

    const shuffledAnswers = answers.sort(() => 0.5 - Math.random())  

    const answerElements = shuffledAnswers.map(answer => {
        return <AnswerOption 
            key={nanoid()}
            value={answer}
        />
    })

    // console.log(shuffledAnswers)

    return (
        <>
        <div className="quiz">
        <h2>{decode(props.question)}</h2>
            {/* <button onClick={props.selectAnswer} style={styles}>{props.answer}</button>
            <button onClick={props.selectAnswer} style={styles}>{props.choice1}</button>
            <button onClick={props.selectAnswer} style={styles}>{props.choice2}</button>
            <button onClick={props.selectAnswer} style={styles}>{props.choice3}</button>   */}



            <div className="answer-options">
                {answerElements}
                {/* <AnswerOption value="Hoy"/>
                <AnswerOption value="Hoy" />
                <AnswerOption value="Hoy" />
                <AnswerOption value="Hoy" /> */}
            </div>
        </div>
        <hr />
        </>
    )
}

export default Quiz