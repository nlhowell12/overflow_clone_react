import React, { Component } from 'react';
import Question from 'components/Question'
import Paper from '@material-ui/core/Paper'


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
                <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', width: '700px', height: '100%'}}>
                    <Paper>
                    {questions.map(question => {
                        return <Question key={question.body} question={question}/>
                    })}    
                    </Paper>
                </div>
            </div>
        )
    }
}

export default Homepage