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
        author: {},
        favorites: [],
        open: false
    }


    componentWillMount = () => {
        if (localStorage.author) {
            this.getUserInfo()
        }
    };

    getUserInfo = async () => {
      const author = await fetch('http://localhost:8000/overflow-users/overflow_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: localStorage.author
                })
        })
        let user_obj = await author.json()
        this.setState({ 
            author: user_obj,
            favorites:user_obj.favorite_obj
         })
    };
    
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
      };
    

    render() {
        const { classes, history } = this.props
        return (
            <CommonContainer>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Hello {this.state.author.name}, here is some of your general info</ListSubheader>}
                    className={classes.root}
                >
                    <ListItem>
                        <ListItemText primary="author" secondary={this.state.author.name} />
                    </ListItem>
                        <Divider light component="li" />
                    <ListItem>
                        <ListItemText primary="Bio" secondary={this.state.author.bio} />
                    </ListItem>
                    <Divider light component="li" />
                    <ListItem>
                        <ListItemText primary="Reputation" secondary={this.state.author.reputation} />
                    </ListItem>
                    <Divider light component="li" />
                    <ListItem>
                        <ListItemText primary="Interests" secondary={this.state.author.interests} />
                    </ListItem>
                    <Divider light component="li" />
                    <ListItem button onClick={this.handleClick}>
                        <ListItemText primary="Favorites"/>
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        {this.state.favorites.map(favorite => {
                        return <List component="div" disablePadding><ListItem button onClick={() => history.push('/question/'+favorite.id+'/')} className={classes.nested}><ListItemText key={favorite.id}primary={favorite.body} /></ListItem></List>   
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
