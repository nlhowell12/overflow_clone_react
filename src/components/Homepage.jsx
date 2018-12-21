import React, { Component } from 'react';
import Question from 'components/Question'


class Homepage extends Component {

    state = {
        questions: []
    }

    getQuestions = async () => {
        const response = await fetch('http://localhost:8000/questions/')
        let questions = await response.json()
        this.setState({questions: questions.results})
    }

    componentWillMount = () => {
        this.getQuestions()
    }

    render() {
        const { questions } = this.state;
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', width: '700px', height: '800px', border: '1px solid black'}}>
                    {questions.map(question => {
                        return <Question question={question}/>
                    })}    
                </div>
            </div>
        )
    }
}

export default Homepage