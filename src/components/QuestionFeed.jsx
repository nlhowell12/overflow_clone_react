import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function QuestionFeed(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      
    </div>
  );
}

QuestionFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionFeed);
