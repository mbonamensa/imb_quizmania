




function Welcome(props) {
    return (
        <div className="home">
            <h1>Welcome to Quizzmania!</h1>
            <button className="check-btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}

export default Welcome