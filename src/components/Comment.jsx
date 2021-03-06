import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import UpvoteButton from 'components/UpvoteButton';
import DownvoteButton from 'components/DownvoteButton';
import AnswerButton from 'components/AnswerButton';
import IconAvatar from 'components/IconAvatar';


class Comment extends Component {
    state = {
        upvote: [],
        downvote: [],
        answer: {}
    }

    componentWillMount = () => {
        const { comment } = this.props;
        this.setState({
            ...this.state,
            upvote: comment.upvote,
            downvote: comment.downvote
        })
    }
    upvote = async () => {
        const { comment } = this.props;
        const response = await fetch('http://localhost:8000/comments/upvote/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: comment.id,
                    author: localStorage.author,
                    owner: comment.author
                })
            })
        const votes = await response.json()
        this.setState({
            ...this.state,
            upvote: votes.upvote,
            downvote: votes.downvote
        })
    }

    downvote = async () => {
        const { comment } = this.props;
        const response = await fetch('http://localhost:8000/comments/downvote/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: comment.id,
                    author: localStorage.author,
                    owner: comment.author
                })
            })
        const votes = await response.json()
        this.setState({
            ...this.state,
            upvote: votes.upvote,
            downvote: votes.downvote
        })
    }

    

    render() {
        const { comment, question, answer } = this.props;
        const { upvote, downvote } = this.state;
        return (
            <Paper style={{paddingLeft: '5px', paddingRight: '5px', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                <Typography variant='h6'>{comment.author}</Typography>
                <Typography>{comment.body}</Typography>
                </div>
                <div style={{display: 'flex'}}>
                    {localStorage.author && localStorage.author !== comment.author ? <UpvoteButton onClick={this.upvote} /> :  null}
                    <Paper style={{minWidth: '50px', maxHeight: '50px', margin: '5px'}}>
                        <Typography variant='headline' align='center' style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                            {upvote ? upvote.length - downvote.length : 0}
                        </Typography>
                    </Paper>
                    {localStorage.author && localStorage.author !== comment.author ? <DownvoteButton onClick={this.downvote} /> : null}
                    {localStorage.author === question.author ? <AnswerButton onClick={this.props.selectAnswer} question={question} comment={comment} answer={answer}/> : null}
                    {answer.id === comment.id && localStorage.author !== question.author ? <IconAvatar/> : null}
                    
                </div>
            </Paper>
        )
    }
}

export default Comment