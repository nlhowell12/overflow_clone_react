import React, { Component } from 'react';
import Question from 'components/Question'


class Homepage extends Component {

    state = {
        questions: []
    }

    getQuestions = async () => {
        const questions = await fetch('http://localhost:8000/questions', {
            method: 'GET',
            mode: 'no-cors'
        })
        console.log(questions)
        this.setState({questions: questions.results})
    }

    componentWillMount = () => {
        this.getQuestions()
    }

    render() {
        const { questions } = this.state;
        return (
            <div>
                <div>
                    {/* {questions.map(question => {
                        return <Question question={question}/>
                    })}     */}
                </div>
            </div>
        )
    }
}

export default Homepage