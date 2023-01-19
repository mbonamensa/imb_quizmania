import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import Quiz from "../components/Quiz"




function Quizzes() {

    const [selected, setSelected] = useState(false)
    const [quiz, setQuiz] = useState([])

    function fetchQuiz() {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(response => response.json())
        .then(data => setQuiz(data.results))
        // .then(data => {
        //     setQuiz({...data, id: nanoid()})
        // })
    }

    useEffect(() => {
        fetchQuiz()
    }, [])

    function selectAnswer() {
        setSelected(prevSelection => !prevSelection)
    }

    // console.log(quiz)

    const quizElements = quiz.map(quizElement => {
        return <Quiz 
            key={nanoid()}
            question={quizElement.question}
            correctAnswer={quizElement.correct_answer}
            incorrectAnswers={quizElement.incorrect_answers}
        />
    })

    return (
        <div className="quizzes">
            <div className="quizzes--container">
                {quizElements}
                {/* <Quiz 
                    question="How would one say goodbye in Spanish?"
                    answer="Adios"
                    choice1="Hola"
                    choice2="Soy"
                    choice3="Buenos dias"
                    selected={selected}
                    selectAnswer={selectAnswer}
                />
                <Quiz 
                    question="Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?"
                    answer="Cabbage Patch Kids"
                    choice1="Transformers"
                    choice2="Care Bears"
                    choice3="Rubik’s Cube"
                    selected={selected}
                    selectAnswer={selectAnswer}
                />
                <Quiz 
                    question="What is the hottest planet in our Solar System?"
                    answer="Mercury"
                    choice1="Venus"
                    choice2="Mars"
                    choice3="Saturn"
                    selected={selected}
                    selectAnswer={selectAnswer}
                />
                <Quiz 
                    question="In which country was the caesar salad invented?"
                    answer="Italy"
                    choice1="Portugal"
                    choice2="Mexico"
                    choice3="France"
                    selected={selected}
                    selectAnswer={selectAnswer}
                />
                <Quiz 
                    question="How Many Hearts Does An Octopus Have?"
                    answer="One"
                    choice1="Two"
                    choice2="Three"
                    choice3="Four"
                    selected={selected}
                    selectAnswer={selectAnswer}
                /> */}
            </div>
            <button>Check answers</button>
        </div>
    )
}

export default Quizzes