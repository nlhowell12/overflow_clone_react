import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from 'components/Chip'
import UpvoteButton from 'components/UpvoteButton'
import DownvoteButton from 'components/DownvoteButton'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Comment from 'components/Comment'
import Paper from '@material-ui/core/Paper'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { withRouter, Link } from "react-router-dom";

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Question extends Component {
    state = {
        author: '',
        comment: '',
        comments: [],
        upvote: [],
        downvote: [],
        answer: {},
        favorite: this.props.favorited
    }

    componentWillMount = () => {
        const { question } = this.props;
        this.setState({
            ...this.state,
            author: question.author,
            comments: question.comments,
            upvote: question.upvote,
            downvote: question.downvote,
            answer: question.answer
        })
    }

    handleComment = name => event => {
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
      };
    
    submitComment = async () => {
       const { comment } = this.state;
       const { question } = this.props;
       const response = await fetch('http://localhost:8000/comments/new/', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               comment,
               question,
               author: localStorage.user
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
        const { question } = this.props;
        const response = await fetch('http://localhost:8000/questions/upvote/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question,
                    user: localStorage.user
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
        const { question } = this.props;
        const response = await fetch('http://localhost:8000/questions/downvote/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question,
                    user: localStorage.user
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
        const { question } = this.props;
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
        const { id } = this.props;
        const response = await fetch('http://localhost:8000/questions/favorite/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    user: localStorage.user
                })
            })
        const response_json = await response.json()
        this.setState({
            favorite: response_json.favorite,
        })
    }

    render() {
    const { classes, question, history, id } = this.props;
    const { comments, upvote, downvote, answer, favorite } = this.state
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                {question.title}
                </Typography>
                <div>
                {question.tags.map(tag => {
                    return <Chip key={tag} tag={tag}/>
                })}  
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h5'>{question.author}</Typography>
                <Typography>
                    {question.body}
                </Typography>
                <div style={{display: 'flex'}}>
                {localStorage.user && localStorage.user !== question.author ? <UpvoteButton onClick={this.upvote} /> :  null}
                <Paper style={{minWidth: '50px'}}><Typography variant='headline' align='center' style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>{upvote.length - downvote.length}</Typography></Paper>
                {localStorage.user && localStorage.user !== question.author ? <DownvoteButton onClick={this.downvote} /> : null}
                </div>
                {localStorage.user ? <div>
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
                </div> : null}
                <div>
                    <Typography variant='h6'><u>Comments</u></Typography>
                    {comments.map(comment => {
                        return <Comment key={comment.id} comment={comment} question={question} selectAnswer={this.selectAnswer} answer={answer}/>
                    })}
                </div>
                
            </ExpansionPanelDetails> 
            <ExpansionPanelActions>
                <Link to={`/question/${id}`}>
                    <Button size="small" onClick={() => history.push('/question/' + id )} >See thread</Button>
                </Link>
                {
                    localStorage.user ?      
                <IconButton aria-haspopup="true" color="inherit" onClick={this.handleFavorite}>
                    {favorite ? <Favorite /> : <FavoriteBorder /> }
                    </IconButton> : null
                }
                
            </ExpansionPanelActions>   
        </ExpansionPanel>
  );
}
}

Question.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Question));
