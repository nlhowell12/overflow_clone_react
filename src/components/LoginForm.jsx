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
        console.log(this.state)
    };

    handleLogin = (event, data) => {
        event.preventDefault()
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.ok ? res.json() : new Error('Something went wrong'))
            .then(json => {
                localStorage.setItem('token', json.token);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <CommonContainer>
                <Card>
                    <CardContent>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Login
                            </Typography>

                        <form onSubmit={e => this.handleLogin(e, this.state)}>
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
                            <Button type="submit" className={classes.button} fullWidth variant="contained">Submit</Button>
                        </form>

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