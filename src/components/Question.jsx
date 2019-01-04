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
        tags: [],
        upvote: [],
        downvote: []
    }

    getAuthor = async (url) => {
        const response = await fetch(url)
        const author = await response.json()
        this.setState({author: author})
    }

    getTags = (urls) => {
        urls.map(async url => {
            const response = await fetch(url)
            const tag = await response.json()
            this.setState({
                ...this.state,
                tags: [...this.state.tags, tag]
            })
        })
    }

    componentWillMount = () => {
        const { question } = this.props
        this.getAuthor(question.author)
        this.getTags(question.tags)
        this.setState({
            ...this.state,
            upvote: question.upvote,
            downvote: question.downvote
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

    render() {
    const { classes, question } = this.props;
    const { author, tags, upvote, downvote } = this.state
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                {question.body}
                </Typography>
                {tags.map(tag => {
                    return <Chip key={tag.title} tag={tag.title}/>
                })}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h5'>{author.name}</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
                <div style={{display: 'flex'}}>
                    <UpvoteButton onClick={this.upvote}/>{upvote.length - downvote.length}<DownvoteButton onClick={this.downvote}/>
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
