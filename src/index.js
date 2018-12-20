import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { BrowserRouter, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#0066ff',
            main: '#3fb542',
            contrastText: 'white',
        },
        secondary: {
            main: '#2196f3'
        }
    }
})

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <Switch>
                <Route exact path='/' component={App}/>
            </Switch>
        </MuiThemeProvider>
    </BrowserRouter>
,    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
