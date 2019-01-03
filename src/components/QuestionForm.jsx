import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'

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

      }

    render() {
        const { classes } = this.props
        return (
            <div>
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
                <Button onClick={evt => this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}

QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withRouter(withStyles(styles)(QuestionForm));
