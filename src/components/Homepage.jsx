import React, { Component } from 'react';
import Question from 'components/Question';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
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
                    <Button onClick={evt => history.push('/newQuestion')}>Ask a Question!</Button>
            </CommonContainer>
        )
    }
}

export default withRouter(Homepage)