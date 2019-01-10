import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BaseLayout from 'components/BaseLayout';
import Homepage from 'components/Homepage'
import QuestionForm from 'components/QuestionForm'
import QuestionThread from 'components/QuestionThread'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserProfile from './components/UserProfile'
import BioForm from './components/BioForm'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffffff',
            main: '#cfd8dc',
            contrastText: '#102027',
        },
    }
})

const NoMatch = ({ location }) => (
    <div>
        404 - Not Found
    </div>
)

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <BaseLayout>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/newQuestion' component={QuestionForm}/>
                    <Route path='/question/:questionId' component={QuestionThread}/>
                    <Route exact path='/login' component={LoginForm}/>
                    <Route exact path='/signup' component={SignupForm}/>
                    <Route exact path='/profile' component={UserProfile}/>
                    <Route exact path='/bio' component={BioForm}/>
                    <Route component={NoMatch}/>
                </Switch>
            </BaseLayout>
        </MuiThemeProvider>
    </BrowserRouter>
,    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
