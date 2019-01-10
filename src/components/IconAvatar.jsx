import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CheckCircle from '@material-ui/icons/CheckCircle'


const styles = theme => ({
  greenAvatar: {
    margin: 10,
    color: '#f50057',
    backgroundColor: theme.palette.primary.light,
  },
});

function IconAvatars(props) {
  const { classes } = props;
  return (
      <Avatar className={classes.greenAvatar}>
        <CheckCircle/>
      </Avatar>
  );
}

IconAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconAvatars);
