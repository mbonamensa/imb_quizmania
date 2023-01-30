




function AnswerOption(props) {
        const styles = {
                backgroundColor: props.endGame ? (props.selected ? (props.isCorrect ? "#358A47" : "#d7263d") : "none") : (props.selected ? "#448FA3" : "none"),
                borderColor: props.endGame ? (props.selected ? (props.isCorrect ? "#358A47" : "#d7263d") : "#02182B") : (props.selected ? "#448FA3" : "#02182B"),
                
        }

        return (
                <button className="answer-btn" style={styles} onClick={props.selectedAnswer}>{props.value}</button>
        )
}

export default AnswerOption