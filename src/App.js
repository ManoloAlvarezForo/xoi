import React, { useContext } from "react";
import { hot } from "react-hot-loader";
import Routes from './Routes/Routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';


const customTheme = createMuiTheme({
  palette: {
    background: {
      paper: '#414755',
      default: '#313640',
    },
    type: 'dark',
    //  background:{  
    //     default:"rgba(239, 239, 239, 1)",
    //     paper:"rgb(197, 197, 197)"
    //  },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#13b9cc',
    },
    secondary: {
      // main: '#ff5722',
      main: '#13b9cc',
    },
    default: {
      main: '#383A47'
    },
    //   text:{  
    //     primary:"#f5f5f5",
    //     secondary:"#080808",
    //     disabled:"rgba(247, 247, 247, 0.38)",
    //     hint:"rgba(240, 234, 234, 0.38)"
    //  }

    // error: will use the default color
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Nunito ExtraLight'
    ].join(','),
  },
});

const App = () => (
  <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </MuiThemeProvider>
)

export default hot(module)(App);