import React, { Component } from 'react';
import Question from 'components/Question';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import CommonContainer from 'components/CommonContainer'
import FilterButtons from './FilterButtons';


class Homepage extends Component {

    state = {
        questions: []
    }

    getQuestions = async () => {
        const response = await fetch('http://localhost:8000/questions/')
        let questions = await response.json()
        console.log(questions)
        this.setState({ questions: questions.results })
    }

    componentWillMount = () => {
        this.getQuestions()
    }

    handleclick = async (query) => {
        const response = await fetch('http://localhost:8000/questions/' + query)
        let questions = await response.json()
        this.setState({ questions: questions.results })
    };

    render() {
        const { questions } = this.state;
        const { history } = this.props;
        return (
            <CommonContainer>
                <Button onClick={evt => history.push('/newQuestion')}>Ask a Question!</Button>
                <FilterButtons handleclick={this.handleclick} />
                {questions.map(question => {
                    return <Question key={question.body} question={question} />
                })}
            </CommonContainer>
        )
    }
}

export default withRouter(Homepage)