import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import "./Navigation.css"
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
    cursor: "pointer",
    listStyle: "none",

  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  logoLink: {
    textDecoration: "none",
    color: "white"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    }
  },
  user___profile: {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    marginLeft: theme.spacing(10),
  },
}));


function Navbar() {
  const classes = useStyles();
  const auth = localStorage.getItem('auth');
  const hasAccount = localStorage.getItem('email');
  const user = localStorage.getItem('firstName');

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography href="#" variant="h4" className={classes.logo}>
          <Link to="/" className={classes.logoLink}>Terranet</Link>
        </Typography>
        <nav >
          <ul className={classes.navlinks}>
            {auth
              ? <li className={classes.user___profile}>
                <ul style={{ display: 'flex' }}> <Avatar className="avatar" /> {user ? user[0].toUpperCase() + user.slice(1,) : ''}</ul>
              </li>
              : hasAccount
                ? <li>
                  <Link to="/login" className={classes.link}>Log in</Link>
                </li>
                : <li>
                  <Link to="/signup" className={classes.link}>Sign up</Link>
                </li>
            }
            <li>
              <Link to="/" className={classes.link}>Blogposts</Link>
            </li>
            <li>
              <Link to="/about" className={classes.link}>About</Link>
            </li>
            <li>
              <Link to="/contact" className={classes.link}>Contact Us</Link>
            </li>

          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;