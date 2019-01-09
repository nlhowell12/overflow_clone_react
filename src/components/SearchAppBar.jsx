import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileMoreAnchorEl_SL: null,
    loggedIn: Boolean(localStorage.author),
    notifications: [],
    notificationMenu: false,
    mobileNotificationMenu: false
  };

  componentWillMount = () => {
    if (localStorage.author) {
      this.getNotifications()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loggedIn !== Boolean(localStorage.author)) {
      this.setState({ loggedIn: Boolean(localStorage.author) });
    }
  }
  
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleNotificationMenuOpen = () => {
    this.setState({
      notificationMenu: true
    })
  }

  handleMobileNotificationMenuOpen = () => {
    this.setState({
      mobileNotificationMenu: true
    })
  }

  handleNotificationMenuClose = () => {
    this.setState({ notificationMenu: false });
    this.handleMobileNotificationMenuClose();
  };

  handleMobileNotificationMenuClose = () => {
    this.setState({ mobileNotificationMenu: false });
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMobileSignupLoginOpen = event => {
    this.setState({ mobileMoreAnchorEl_SL: event.currentTarget });
  };

  handleMobileSignupLoginClose = () => {
    this.setState({ mobileMoreAnchorEl_SL: null });
  };

  handleLogout = () => {
    localStorage.removeItem("author")
    localStorage.removeItem("token")
    this.handleMenuClose();
  };

  getNotifications = async () => {
    const response = await fetch('http://localhost:8000/notifications/serve/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author: localStorage.author
        })
    })
    const notifications = await response.json()
    this.setState({
      ...this.state,
      notifications: notifications
    })
}

  render() {
    const { anchorEl, mobileMoreAnchorEl, mobileMoreAnchorEl_SL, loggedIn, notifications, notificationMenu } = this.state;
    const { classes, history } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isMobileSignupLoginOpen = Boolean(mobileMoreAnchorEl_SL);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleNotificationMenu}>
          <IconButton color="inherit">
            <Badge badgeContent={this.state.notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const renderMobileSignupLogin = (
      <Menu
        anchorEl={mobileMoreAnchorEl_SL}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileSignupLoginOpen}
        onClose={this.handleMobileSignupLoginClose}
      >
        <MenuItem>
          <Button className={classes.button} onClick={evt => history.push('/login')}>Login</Button>
        </MenuItem>
        <MenuItem>
          <Button className={classes.button} onClick={evt => history.push('/signup')}color="secondary" variant="contained">Sign Up</Button>
        </MenuItem>
      </Menu>
    );

    const renderUserMenu = (
      <React.Fragment>
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit" onClick={this.handleNotificationMenuOpen}>
            <Badge invisible={this.state.notifications.length === 0} badgeContent={this.state.notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
      </React.Fragment>
    );

    const renderSignupLogin = (
      <React.Fragment>
        <div className={classes.sectionDesktop}>
          <Button className={classes.button} onClick={evt => history.push('/login')}>Login</Button>
          <Button className={classes.button} onClick={evt => history.push('/signup')}color="secondary" variant="contained">Sign Up</Button>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" color="inherit" onClick={this.handleMobileSignupLoginOpen}>
            <MoreIcon />
          </IconButton>
        </div>
      </React.Fragment>
    )
    
    const renderNotifications = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notificationMenu}
        onClose={this.handleNotificationMenuClose}
      >
      {notifications.map(notification => {
            return  <MenuItem key={notification.id}>
                      {`${notification.answer_user} commented on ${notification.question} at ${notification.date}`}
                      <Button size="small" onClick={evt => history.push('/question/' + notification.question_id )} >See thread</Button>
                    </MenuItem>  
          })}
      </Menu>
    )
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} onClick={evt => history.push('/')} variant="h6" color="inherit" noWrap>
              Kenzie Overflow
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            {loggedIn ? renderUserMenu : renderSignupLogin}
          </Toolbar>
        </AppBar>
        {renderNotifications}
        {renderMenu}
        {renderMobileMenu}
        {renderMobileSignupLogin}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(PrimarySearchAppBar));
