import React, { Component } from 'react';
import Question from 'components/Question';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import CommonContainer from 'components/CommonContainer'
import FilterButtons from './FilterButtons';


class Homepage extends Component {

    state = {
        questions: [],
        user: {}
    }

    getQuestions = async () => {
        const response = await fetch('http://localhost:8000/questions/serve')
        let questions = await response.json()
        this.setState({ questions: questions})
    }

    getInfo = async () => {
        const user = await fetch('http://localhost:8000/overflow-users/overflow_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: localStorage.user
              })
        })
        let user_obj = await user.json()
        this.setState({ user: user_obj })
    }

    componentWillMount = () => {
        this.getQuestions()
        if (localStorage.user) {
            this.getInfo()
        }
    }

    handleclick = async (query) => {
        const response = await fetch('http://localhost:8000/questions/' + query)
        let questions = await response.json()
        this.setState({ questions: questions.results })
    };

    render() {
        const { questions, user } = this.state;
        const { history } = this.props;
        return (
            <CommonContainer>
                <Button onClick={() => history.push('/newQuestion')}>Ask a Question!</Button>
                <FilterButtons handleclick={this.handleclick} />
                {questions.map(question => {
                    return <Question key={question.id} id={question.id} question={question} favorited={ user.favorites && user.favorites.includes(question.id) ? true : false } />
                })}
            </CommonContainer>
        )
    }
}

export default withRouter(Homepage)