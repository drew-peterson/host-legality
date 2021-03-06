import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeProvider } from 'styled-components';

import reduxThunk from 'redux-thunk';

// Provider : is a component from react-redux that helps redux work with react that makes the store accesible to every component
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { ThemeColor } from './styles/themeColor';

window.axios = axios; // for testing producted routes w/ cookies

const store = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

// when the store is update the provider component will update all its children w/ new state
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={ThemeColor}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root')
);

// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#referencing-environment-variables-in-the-html
