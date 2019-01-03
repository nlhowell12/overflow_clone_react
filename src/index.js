import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BaseLayout from 'components/BaseLayout';
import Homepage from 'components/Homepage'
import QuestionForm from 'components/QuestionForm'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#0066ff',
            main: '#3fb542',
            contrastText: '#fff',
        },
        secondary: {
            main: '#2196f3'
        }
    }
})

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <BaseLayout>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/newQuestion' component={QuestionForm}/>
                </Switch>
            </BaseLayout>
        </MuiThemeProvider>
    </BrowserRouter>
,    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
