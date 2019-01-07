import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class Comment extends Component {
    render() {
        const { comment } = this.props;
        return (
            <Paper style={{paddingLeft: '5px', paddingRight: '5px'}}>
                <Typography variant='h6'>{comment.author}</Typography>
                <Typography>{comment.body}</Typography>
            </Paper>
        )
    }
}

export default Comment