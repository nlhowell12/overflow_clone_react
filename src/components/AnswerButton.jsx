import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { comment } from 'postcss-selector-parser';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function OutlinedButtons(props) {
  const { classes, answer, comment } = props;
  return (
    <div>
      <Button variant="outlined" disabled={answer.body && answer.body !== comment.body} color={answer.body === comment.body ? 'secondary' : 'primary'} className={classes.button} onClick={() => props.onClick(comment)}>
        Answer
      </Button>
    </div>
  );
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);
