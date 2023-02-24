




function Welcome(props) {
    return (
        <div className="home">
            <h1>Welcome to Quizmania!</h1>
            <p>Wanna rack your brains? &#128071;&#127998;</p>
            <button className="check-btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}

export default Welcome