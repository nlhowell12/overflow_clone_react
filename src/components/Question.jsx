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
        comments: []
    }

    componentWillMount = () => {
        const { question } = this.props;
        this.setState({
            ...this.state,
            author: question.author,
            comments: question.comments
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

    render() {
    const { classes, question } = this.props;
    const { author, comments } = this.state
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                {question.body}
                </Typography>
                <div>
                {question.tags.map(tag => {
                    return <Chip key={tag} tag={tag}/>
                })}  
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h5'>{author.name}</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
                <div style={{display: 'flex'}}>
                    <UpvoteButton/><DownvoteButton/>
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
                    {comments.map(comment => {
                        return <Comment key={comment.body} comment={comment}/>
                    })}
                </div>
                
            </ExpansionPanelDetails>    
        </ExpansionPanel>
  );
}
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Question);
