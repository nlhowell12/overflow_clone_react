import React, { Component } from 'react';
import Question from 'components/Question'
import Paper from '@material-ui/core/Paper'
import CommonContainer from 'components/CommonContainer'


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
            <CommonContainer>
                    <Paper>
                    {questions.map(question => {
                        return <Question key={question.body} question={question}/>
                    })}    
                    </Paper>
            </CommonContainer>
        )
    }
}

export default Homepage