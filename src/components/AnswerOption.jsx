




function AnswerOption(props) {

        const darkmodeStyles = {

                backgroundColor: props.endQuiz ? (props.selected ? (props.isCorrect ? "#358A47" : "#d7263d") : (props.isCorrect ? "#358A47" :"none")) : (props.selected ? "#448FA3" : "none"),
                borderColor: props.endQuiz ? (props.selected ? (props.isCorrect ? "#358A47" : "#d7263d") : (props.isCorrect ? "#358A47" :"#f5f7fb59")) : (props.selected ? "#448FA3" : "none"),
                color: props.endQuiz ? (props.isCorrect ? "#02182B" :"#f5f7fb59") : "#F5F7FB",
                cursor: props.endQuiz ? "not-allowed" : "pointer"
        }

        const styles = {
                backgroundColor: props.endQuiz ? (props.selected ? (props.isCorrect ? "#358A47" : "#d7263d") : (props.isCorrect ? "#358A47" :"none")) : (props.selected ? "#448FA3" : "none"),
                borderColor: props.endQuiz ? (props.selected ? (props.isCorrect ? "#358A47" : "#d7263d") : (props.isCorrect ? "#358A47" :"#02182b66")) : (props.selected ? "#448FA3" : "none"),
                color: props.endQuiz ? (props.isCorrect ? "#02182B" :"#02182b66") : "#02182B",
                cursor: props.endQuiz ? "not-allowed" : "pointer"
                
        }

        return (
                <button 
                        className="answer-btn" 
                        style={props.darkmode? darkmodeStyles : styles} 
                        onClick={props.selectedAnswer} 
                        disabled={props.endQuiz ? true : false}
                >
                        {props.value}
                </button>
        )
}

export default AnswerOption