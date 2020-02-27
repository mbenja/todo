import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import App from './components/App';

import './index.css';
import "./styles/colors.css";
import 'typeface-roboto';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

ReactDOM.render(<ThemeProvider theme={darkTheme}><App /></ThemeProvider>, document.getElementById('root'));