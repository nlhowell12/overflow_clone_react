import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommonContainer from 'components/CommonContainer';
import MultipleSelect from 'components/MultipleSelect';
import { withRouter } from 'react-router-dom';

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
      question: '',
      tags: [],
      selectedTags: []
      };
    
      componentWillMount = () => {
        this.getTags()
      }

      getTags = async () => {
        const response = await fetch('http://localhost:8000/tags')
        const tags = await response.json()
        tags.results.map(tag => {
          return this.setState({
            ...this.state,
            tags: [...this.state.tags, tag.title]
          })
        })
      }
      questionChange = name => event => {
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
      };

      tagChange = event => {
        this.setState({ ...this.state, selectedTags: event.target.value });
      };
    
      handleSubmit = async () => {
        const { question, selectedTags } = this.state;
        const { history } = this.props;
        await fetch('http://localhost:8000/questions/new/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                body: question,
                author: localStorage.user,
                tags: selectedTags
            })
        })
        history.push('/')
      }

    render() {
        const { classes } = this.props
        const { tags, selectedTags } = this.state
        return (
            <CommonContainer>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Question"
                    multiline
                    rowsMax="4"
                    value={this.state.question}
                    onChange={this.questionChange('question')}
                    className={classes.textField}
                    margin="normal"
                    helperText="Enter your question and then click submit"
                    variant="outlined"
                />
                <MultipleSelect onChange={this.tagChange} tags={tags} selectedTags={selectedTags}/>
                <Button onClick={evt => this.handleSubmit()}>Submit</Button>
            </CommonContainer>
        )
    }
}

QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withRouter(withStyles(styles)(QuestionForm));
