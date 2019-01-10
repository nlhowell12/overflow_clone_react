import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommonContainer from 'components/CommonContainer'


const styles = theme => ({
    title: {
        fontSize: 30,
    },
    button: {
        marginTop: theme.spacing.unit * 2
    }
});


class LoginForm extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleLogin = async (data) => {
        const { history } = this.props;
        const { username, password } = this.state
        if (!username.length > 0 || !password.length > 0){ return; } 
        await fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
              })
        })
            .then(res => res.json())
            .then(json => {
                if (json.non_field_errors)(
                    window.alert("You are not signed up.")
                )
                else{
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('author', json.author.username)
                    history.push("/")
                }
            })
    };

    render() {
        const { classes, history } = this.props;
        return (
            <CommonContainer>
                <Card>
                    <CardContent>
                        <Typography variant='h5' color="textPrimary" gutterBottom>Not a member?</Typography>
                        <Typography variant='h5' style={{cursor: "pointer"}} onClick={() => history.push('/signup')}color="secondary">Sign Up</Typography>
                        <br/>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            onChange={this.handleChange('username')}
                            margin="normal"
                            variant="outlined"
                            label="Username"
                            fullWidth />
                        <TextField
                            onChange={this.handleChange('password')}
                            margin="normal"
                            variant="outlined"
                            label="Password"
                            fullWidth
                            type="password" />
                        <Button type="submit" onClick={ () => this.handleLogin() } className={classes.button} fullWidth variant="contained">Submit</Button>
                    </CardContent>
                </Card>
            </CommonContainer>
        )
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);