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


class SignupForm extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSignup = async () => {
        const { username, password } = this.state;
        const { history } = this.props;
        await fetch('http://localhost:8000/core/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password,
            })
        })
        .then(res => res.json())
        .then(json => {
            if (!username.length > 0 || !password.length > 0){ return; } 
            if (json.username[0] === "A user with that username already exists.")(
                window.alert(json.username[0])
            )
            else{
                history.push('/login')
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <CommonContainer>
                <Card>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Signup
                        </Typography>
                        {/* <TextField onChange={this.handleChange('email')} margin="normal" variant="outlined" label="Email" fullWidth /> */}
                        <TextField onChange={this.handleChange('username')} margin="normal" variant="outlined" label="Username" fullWidth />
                        <TextField onChange={this.handleChange('password')} margin="normal" variant="outlined" label="Password" fullWidth type="password" />
                        <Button onClick={() => this.handleSignup()} className={classes.button} fullWidth variant="contained">Submit</Button>
                    </CardContent>
                </Card>
            </CommonContainer>
        )
    }
}

SignupForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupForm);