import React, { Component } from 'react';
import Question from 'components/Question';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';


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
                    <Button onClick={evt => history.push('/newQuestion')}>Ask a Question!</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Homepage)