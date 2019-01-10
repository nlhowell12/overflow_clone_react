import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommonContainer from 'components/CommonContainer';


const styles = theme => ({
    title: {
        fontSize: 30,
    },
    button: {
        marginTop: theme.spacing.unit * 2
    }
});


class BioForm extends Component {

    state = {
        author: {},
        bio: '',
    }

    getUserInfo = async () => {
        const user = await fetch('http://localhost:8000/overflow-users/overflow_user/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  author: localStorage.author
                  })
          })
          let user_obj = await user.json()
          this.setState({ 
              author: user_obj,
              bio: user_obj.bio
           })
      };
      

      componentWillMount() {
          if(localStorage.author)
          this.getUserInfo()
      }


    handleChange = prop => event => {
        this.setState({ bio: event.target.value });
    };


    handleBioUpdate = async (data) => {
        const { history } = this.props;
        const { bio, author } = this.state
        console.log(bio)
        console.log(author)
        await fetch('http://localhost:8000/overflow-users/bio/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bio,
                author,
              })
        })
        history.push("/profile/")
    };

    render() {
        const { classes } = this.props;

        return (
            <CommonContainer>
                <Card>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Who is {this.state.author.name}?
                        </Typography>
                            <TextField
                                onChange={this.handleChange('bio')}
                                margin="normal"
                                variant="outlined"
                                label="Write something about yourself..."
                                fullWidth />
                            <Button type="submit" onClick={ () => this.handleBioUpdate() } onChange={ () => this.handleChange() } className={classes.button} fullWidth variant="contained">Update My bio</Button>
                    </CardContent>
                </Card>
            </CommonContainer>
        )
    }
}

BioForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BioForm);