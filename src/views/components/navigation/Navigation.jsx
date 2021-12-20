import React from 'react';
import { Link } from 'react-router-dom';

/* MUI Imports */
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from '@material-ui/core';

/* Local imports */
import '../../styles/navigation/Navigation.css';
import NavList from '../partials/navigation/NavList.jsx';

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: '1',
  },
  logoLink: {
    textDecoration: 'none',
    color: 'white',
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <CssBaseline />
      <Toolbar>
        <Typography href="#" variant="h4" className={classes.logo}>
          <Link to="/" className={classes.logoLink}>
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
export default Navbar;
