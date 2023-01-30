import { nanoid } from "nanoid"
import { decode } from "html-entities"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react"
import Quiz from "../components/Quiz"




function Quizzes() {

    const [quiz, setQuiz] = useState([])
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState(0)
    const [endGame, setEndGame] = useState(false)
   
    
    function fetchQuiz() {
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
                        isCorrect: false
                    }
                })
    
                newQuizData.push({
                    question: (unfiltered.question),
                    correctAnswer: (unfiltered.correct_answer),
                    answers: answerObjects,
                    id: nanoid()
                })
            }
    
            // setTimeout(() => {

            //     setQuiz(newQuizData)
            
            // }, 5000)

            setQuiz(newQuizData)
            
        })
        
       

    }

    useEffect(() => {

        fetchQuiz()
  
       
    }, [])

    function handleLoading() {
        setTimeout(() => {
            setLoading(false)
        }, 5000) 
    }

    useEffect(() => {
        window.addEventListener("load", handleLoading)
        return () => window.removeEventListener("load", handleLoading)
    }, [])


    function selectedAnswer(answerId, quizId) {
  
        setQuiz(prevQuiz => {
            
            return prevQuiz.map(quizElement => {
                if (quizId === quizElement.id) {
                    return {
                        ...quizElement,  
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

        // console.log(`${answerId} and ${quizId} selected!`)
    }

    function checkAnswers() {

        // const QuizArrayWithSelectedAnswers = [...quiz]
        
        // let scoreCount = 0
        // for (let i = 0; i < QuizArrayWithSelectedAnswers.length; i++) {
        //     const eachQuiz = QuizArrayWithSelectedAnswers[i]

        //     eachQuiz.answers.map(answer => {
        //         if(answer.isSelected) {
        //             if(answer.answerValue === eachQuiz.correctAnswer) {
        //                 scoreCount += 1

        //             }
        //         }
        //     })
        // }

        // return setScore(scoreCount)

        setQuiz(prevQuiz => {
            
            return prevQuiz.map(quizElement => {
                return {
                    ...quizElement,
                    answers: quizElement.answers.map(answer => {
                        if(answer.isSelected && answer.answerValue === quizElement.correctAnswer) {
                            return {
                                ...answer,
                                isCorrect: true
                            }

                        } else {
                            return {
                                ...answer,
                                isCorrect: false
                            }
                        }
                       
                    })
                }


            })
        })

        setEndGame(true)

    }
    
    console.log(quiz)
    // console.log(answeChecks)
    
    const quizElements = quiz.map(quizElement => {
        return <Quiz 
        key={nanoid()}
        question={quizElement.question}
        correctAnswer={quizElement.correctAnswer}
        allAnswers={quizElement.answers}
        selectedAnswer={selectedAnswer}
        quizId={quizElement.id}
        loading={loading}
        endGame={endGame}
        />
    })
    

    return (
        <div className="quizzes">
            <div className="quizzes--container">
                {/* { 
                    loading ? 
                    (
                        <>
                        <h2><Skeleton /></h2>
                        <div className="answer-options">
                            <Skeleton width={80} count={4} containerClassName="answers-skeleton" />
                        </div>
                        </>
                        
                    ) :
                    quizElements 
                } */}
                
                {quizElements}
            </div>
            {loading ? <Skeleton /> : <button onClick={checkAnswers}>Check answers</button>}
        </div>
    )
}

export default Quizzes