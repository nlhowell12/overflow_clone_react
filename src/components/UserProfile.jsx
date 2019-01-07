import React, { Component } from 'react';
import CommonContainer from 'components/CommonContainer'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Question from 'components/Question';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});


class UserProfile extends Component {
    state = {
        user: {},
        favorites: [],
        open: true
    }


    componentWillMount = () => {
        if (localStorage.user) {
            this.getUserInfo()
        }
    };

    getUserInfo = async () => {
      const user = await fetch('http://localhost:8000/overflow-users/overflow_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: localStorage.user
                })
        })
        let user_obj = await user.json()
        this.setState({ 
            user: user_obj,
            favorites:user_obj.favorite_obj
         })
    };
    
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
      };
    

    render() {
        const { classes } = this.props
        console.log(this.state.favorites)
        return (
            <CommonContainer>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Hello {this.state.user.name}, here is some of your general info</ListSubheader>}
                    className={classes.root}
                >
                    <ListItem>
                        <ListItemText primary="User" secondary={this.state.user.name} />
                    </ListItem>
                        <Divider light component="li" />
                    <ListItem>
                        <ListItemText primary="Bio" secondary={this.state.user.bio} />
                    </ListItem>
                    <Divider light component="li" />
                    <ListItem>
                        <ListItemText primary="Reputation" secondary={this.state.user.reputation} />
                    </ListItem>
                    <Divider light component="li" />
                    <ListItem>
                        <ListItemText primary="Interests" secondary={this.state.user.interests} />
                    </ListItem>
                    <Divider light component="li" />
                    <ListItem button onClick={this.handleClick}>
                        <ListItemText primary="Favorites"/>
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        {/* <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={this.state.user.favorite_obj[0].id} />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={this.state.favorites[1]} />
                            </ListItem>
                        </List> */}
                        {this.state.favorites.map(favorite => {
                        return <span key={favorite.id}> { favorite.body }</span>
                }
                )}
                    </Collapse>
                </List>
            </CommonContainer>
        )
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(UserProfile)
