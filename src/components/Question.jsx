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
        tags: []
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
    }

    render() {
    const { classes, question } = this.props;
    const { author, tags } = this.state
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                {question.body}
                </Typography>
                <div>
                {tags.map(tag => {
                    return <Chip key={tag} tag={tag.title}/>
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
            </ExpansionPanelDetails>
        </ExpansionPanel>
  );
}
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Question);
