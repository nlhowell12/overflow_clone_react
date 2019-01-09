import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const styles = theme => ({
    grid: {
        marginTop: theme.spacing.unit * 15
    }
});

class CommonContainer extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid container justify="center" className={classes.grid} spacing={24}>
                    <Grid item xs={12} sm={12} md={10}>
                        <Paper>
                            {this.props.children}
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

CommonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonContainer);