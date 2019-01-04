import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function DownvoteButton(props) {
  const { classes } = props;
  return (
    <div>
      <Fab size='small' color="primary" aria-label="Add" className={classes.fab} onClick={props.onClick}>
        <RemoveIcon />
      </Fab>
    </div>
  );
}

DownvoteButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DownvoteButton);
