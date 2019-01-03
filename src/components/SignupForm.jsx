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



    render() {
        const { classes } = this.props;
        return (
            <CommonContainer>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Signup
                            </Typography>
                            <form method="POST" action="http://localhost:8000/core/users/" >
                                <TextField margin="normal" variant="outlined" label="Email" fullWidth />
                                <TextField margin="normal" variant="outlined" label="Username" fullWidth name="username"/>
                                <TextField margin="normal" variant="outlined" label="Password" fullWidth name="password" type="password" />
                                <Button type="submit" className={classes.button} fullWidth variant="contained">Submit</Button>
                            </form>
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