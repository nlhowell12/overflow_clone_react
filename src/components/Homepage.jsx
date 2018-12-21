import React, { Component } from 'react';
import Question from 'components/Question'
import CommonContainer from 'components/CommonContainer'
import FilterButtons from './FilterButtons';


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

    handleclick = async (query) => {
        const response = await fetch('http://localhost:8000/questions/' + query)
        let questions = await response.json()
        this.setState({questions: questions.results})
    };

    render() {
        const { questions } = this.state;
        return (
            <CommonContainer>
                <FilterButtons handleclick={ this.handleclick }/>
                    {questions.map(question => {
                        return <Question key={question.body} question={question}/>
                    })}    
            </CommonContainer>
        )
    }
}

export default Homepage