import React from 'react';
import { Link } from 'react-router-dom';

/* MUI Imports */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

/* Local imports */
import '../../styles/navigation/Navigation.css';
import NavList from '../partials/navigation/NavList.jsx';

const useStyles = makeStyles(() => ({
  logo: {
    flexGrow: '1',
  },
  logoLink: {
    textDecoration: 'none',
    color: 'white',
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <CssBaseline />
      <Toolbar>
        <Typography href="#" variant="h4" className={classes.logo}>
          <Link to="/blog" className={classes.logoLink}>
            Terranet
          </Link>
        </Typography>
        <nav>
          <NavList />
        </nav>
      </Toolbar>
    </AppBar>
  );
}
