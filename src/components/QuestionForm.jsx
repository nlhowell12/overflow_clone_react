import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommonContainer from 'components/CommonContainer';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class QuestionForm extends Component {
    state = {
        multiline: '',
      };
    
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
      handleSubmit = async () => {
        const { multiline } = this.state;
        const { history } = this.props;
        await fetch('http://localhost:8000/questions/new/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                body: multiline,
                author: localStorage.user
            })
        })
        history.push('/')
      }

    render() {
        const { classes } = this.props
        return (
            <CommonContainer>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Question"
                    multiline
                    rowsMax="4"
                    value={this.state.multiline}
                    onChange={this.handleChange('multiline')}
                    className={classes.textField}
                    margin="normal"
                    helperText="Enter your question and then click submit"
                    variant="outlined"
                />
                <Button onClick={evt => this.handleSubmit()}>Submit</Button>
            </CommonContainer>
        )
    }
}

QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withRouter(withStyles(styles)(QuestionForm));
