import { nanoid } from "nanoid"
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react"
import Quiz from "../components/Quiz"
import Welcome from "./Welcome"




function Quizzes() {

    const [quiz, setQuiz] = useState([])
    const [quizStart, setQuizStart] = useState(false)
    const [loading, setLoading] = useState(true)
    const [allAnswersSelected, setAllAnswersSelected] = useState(false)
    const [score, setScore] = useState(0)
    const [endQuiz, setEndQuiz] = useState(false)
   
    
    function fetchQuiz() {
        setLoading(true)
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(response => response.json())
        .then(data => {
            const unfilteredData = data.results
    
            const newQuizData = []
    
            for(let i = 0; i < unfilteredData.length; i++) {
                const unfiltered = unfilteredData[i]
                const allAnswers = [...unfiltered.incorrect_answers, unfiltered.correct_answer]
                const shuffleAllAnswers = allAnswers.sort(() => {return (0.5 - Math.random())})
    
                const answerObjects = shuffleAllAnswers.map(answer => {
                    return {
                        id: nanoid(),
                        answerValue: answer,
                        isSelected: false,
                        isCorrect: answer === unfiltered.correct_answer ? true : false
                    }
                })
    
                newQuizData.push({
                    question: (unfiltered.question),
                    correctAnswer: (unfiltered.correct_answer),
                    answers: answerObjects,
                    hasSelectedAnswer: false,
                    id: nanoid()
                })
            }
            setQuiz(newQuizData)
            setLoading(false)
            
        })
    }

    useEffect(() => {

        fetchQuiz()
       
    }, [])

    useEffect(() => {
        // const quizClone = [...quiz]
        const allAnswerschecked = quiz.every(quiz => quiz.hasSelectedAnswer)
        if(allAnswerschecked) {
            setAllAnswersSelected(prev => !prev)
        }
    }, [quiz])


    function startQuiz() {
        setQuizStart(true)
        fetchQuiz()
        setAllAnswersSelected(false)
        setEndQuiz(false)
    }

    function selectedAnswer(answerId, quizId) {
  
        setQuiz(prevQuiz => {
            
            return prevQuiz.map(quizElement => {
                if (quizId === quizElement.id) {
                    return {
                        ...quizElement, 
                        hasSelectedAnswer: !quizElement.hasSelectedAnswer, 
                        answers: quizElement.answers.map(answer => {
                            if(answer.id === answerId) {
                                
                                return {
                                    ...answer,
                                    isSelected: !answer.isSelected
        
                                }
                            } else {
                                return {
                                    ...answer,
                                    isSelected: false
                                }
                            }
                        }) 
                    }
                  
                } else {
                    return quizElement
                }
            })
        })
    }


    function countScores() {
        const QuizArrayWithSelectedAnswers = [...quiz]
        
        let scoreCount = 0
        for (let i = 0; i < QuizArrayWithSelectedAnswers.length; i++) {
            const eachQuiz = QuizArrayWithSelectedAnswers[i]

            eachQuiz.answers.map(answer => {
                if(answer.isSelected) {
                    if(answer.answerValue === eachQuiz.correctAnswer) {
                        scoreCount += 1

                    }
                }
            })
        }

        return setScore(scoreCount)
    }

    console.log(allAnswersSelected)

    function checkAnswers() {
        
        setEndQuiz(true)
        countScores()

    }
    
    console.log(quiz)
    
    const quizElements = quiz.map(quizElement => {
        return <Quiz 
        key={nanoid()}
        question={quizElement.question}
        correctAnswer={quizElement.correctAnswer}
        allAnswers={quizElement.answers}
        selectedAnswer={selectedAnswer}
        quizId={quizElement.id}
        loading={loading}
        endQuiz={endQuiz}
        />
    })
    
    const buttonStyle = {
        cursor: allAnswersSelected ? "pointer" : "not-allowed",
        opacity: allAnswersSelected ? "1" : "0.8"
    }

    return (
        <div className="quizzes">
            {quizStart ?
                
                (  <>
                    <div className="quizzes--container">                
                        {quizElements}
                    </div>
                    <div className="checks">
                        {endQuiz && <p>You scored {score}/5</p>}
                        <button 
                            disabled={allAnswersSelected ? false : true} 
                            onClick={endQuiz ? startQuiz : checkAnswers}
                            style={buttonStyle }
                        >{endQuiz ? "Play again" : "Check answers"}</button>
                    </div>
                   
                    </>
                )
                :
                <Welcome startQuiz={startQuiz}/>
            }
        </div>
    )
}

export default Quizzes