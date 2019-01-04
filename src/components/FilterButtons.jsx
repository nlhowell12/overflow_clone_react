import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 1
    }
});

class FilterButtons extends Component {

    state = {
        questions: []
    }

    render() {
        const { classes, handleclick } = this.props;
        return (
                <Grid item >
                    <Button onClick={ () => handleclick("date") } variant="contained" color="default" className={classes.button}>Newest</Button>
                    <Button onClick={ () => handleclick("tag") } variant="contained" color="default" className={classes.button}>Tag</Button>
                    <Button onClick={ () => handleclick("upvote") } variant="contained" color="default" className={classes.button}>Most Upvoted</Button>
                    <Button onClick={ () => handleclick("unanswered") } variant="contained" color="default" className={classes.button}>Unanswered</Button>
                </Grid>
        )
    }
}

FilterButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterButtons);