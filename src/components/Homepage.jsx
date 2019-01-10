import React, { Component } from 'react';
import Question from 'components/Question';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import CommonContainer from 'components/CommonContainer'
import FilterButtons from './FilterButtons';


class Homepage extends Component {

    state = {
        questions: [],
        author: {}
    }

    getQuestions = async () => {
        const response = await fetch('http://localhost:8000/questions/serve')
        let questions = await response.json()
        this.setState({ questions: questions})
    }

    getInfo = async () => {
        const author = await fetch('http://localhost:8000/overflow-users/overflow_user_profile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: localStorage.author
              })
        })
        let user_obj = await author.json()
        this.setState({ author: user_obj })
    }

    componentWillMount = () => {
        this.getQuestions()
        if (localStorage.author) {
            this.getInfo()
        }
    }

    handleclick = async (query) => {
        const response = await fetch('http://localhost:8000/questions/' + query)
        let questions = await response.json()
        this.setState({ questions: questions })
    };

    render() {
        const { questions, author } = this.state;
        const { history } = this.props;
        return (
            <CommonContainer>
                <Button onClick={() => history.push('/newQuestion')}>Ask a Question!</Button>
                <FilterButtons handleclick={this.handleclick} />
                {questions.map(question => {
                    return <Question key={question.id} id={question.id} question={question} favorited={ author.favorites && author.favorites.includes(question.id) ? true : false } />
                })}
            </CommonContainer>
        )
    }
}

export default withRouter(Homepage)