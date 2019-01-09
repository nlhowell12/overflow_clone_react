import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import UpvoteButton from 'components/UpvoteButton'
import Paper from '@material-ui/core/Paper'
import DownvoteButton from 'components/DownvoteButton'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Comment from 'components/Comment'
import CommonContainer from 'components/CommonContainer'
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { CardActions } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class QuestionThread extends Component {

  state = {
    question: {},
    title: '',
    author: '',
    comments: [
      { body: '' }
    ],
    upvote: [],
    downvote: [],
    answer: '',
    comment: '',
    favorite: false,
  }

  componentWillMount = () => {
    this.getQuestion()
    if (localStorage.author) {
      this.getUserInfo()
    }
  }

  getQuestion = async () => {
    const questionId = parseInt(this.props.match.params.questionId)
    const response = await fetch('http://localhost:8000/questions/singleQuestion/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId
        })
      })
    let question = await response.json()
    console.log(question[0])
    this.setState({
      ...this.state,
      question: question[0],
      title: question[0].title,
      author: question[0].author,
      upvote: question[0].upvote || [],
      downvote: question[0].downvote || [],
      answer: question[0].answer,
      comments: question[0].comments
    })
  }

  getUserInfo = async () => {
    const questionId = parseInt(this.props.match.params.questionId)
    const author = await fetch('http://localhost:8000/overflow-users/overflow_user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: localStorage.author
      })
    })
    let user_obj = await author.json()
    this.setState({ 
      favorite: Boolean(user_obj.favorites.includes(questionId))
     })
  }

  handleComment = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  submitComment = async () => {
    const { comment, question } = this.state;
    const response = await fetch('http://localhost:8000/comments/new/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment,
        question,
        author: localStorage.author
      })
    })
    const newComment = await response.json()
    this.setState({
      ...this.state,
      comments: [...this.state.comments, newComment],
      comment: ''
    })
  }

  upvote = async () => {
    const { question } = this.state;
    const response = await fetch('http://localhost:8000/questions/upvote/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          author: localStorage.author
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
    const { question } = this.state;
    const response = await fetch('http://localhost:8000/questions/downvote/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          author: localStorage.author
        })
      })
    const votes = await response.json()
    this.setState({
      ...this.state,
      upvote: votes.upvote,
      downvote: votes.downvote
    })
  }

  selectAnswer = async (comment) => {
    const { question } = this.state;
    const response = await fetch('http://localhost:8000/comments/answer/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment,
        question
      })
    })
    const answer = await response.json()
    this.setState({
      ...this.state,
      answer: answer
    })
  }

  handleFavorite = async () => {
    const questionId = parseInt(this.props.match.params.questionId)
    const response = await fetch('http://localhost:8000/questions/favorite/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: questionId,
          author: localStorage.author,
        })
      })
    const response_json = await response.json()
    this.setState({
      favorite: response_json.favorite,
    })
  }

  render() {
    const { question, upvote, downvote, comments, answer, favorite } = this.state;
    return (
      <CommonContainer>
        <Card>
        <CardHeader title={question.title}/>
          <CardContent>
            <pre><Typography>{question.body}</Typography></pre>

            <div style={{ display: 'flex' }}>

              <UpvoteButton onClick={this.upvote} />

              <Paper style={{ minWidth: '50px' }}>
                <Typography variant='headline' align='center' style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                  { upvote.length - downvote.length }
                </Typography>
              </Paper>

              <DownvoteButton onClick={this.downvote} />
            </div>

            <div>
              <TextField
                id="outlined-full-width"
                label="Comment"
                placeholder="Enter text here"
                helperText="Leave a comment to be selected as a possible answer."
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleComment('comment')}
              />
              <Button onClick={this.submitComment}>Leave Comment</Button>
            </div>
            <div>
              <Typography variant='h6'><u>Comments</u></Typography>
              { comments.map(comment => {
                return <Comment key={comment.id} id={comment.id} comment={comment} question={question} selectAnswer={this.selectAnswer} answer={answer} />
              })}
            </div>
            <CardActions>
              { localStorage.author ?
                <IconButton aria-haspopup="true" color="inherit" onClick={this.handleFavorite}>
                  {favorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton> :
                null
              }
            </CardActions>
          </CardContent>
        </Card>
      </CommonContainer>
    );
  }
}

QuestionThread.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(QuestionThread));
