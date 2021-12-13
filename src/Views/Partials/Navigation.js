import React from "react";
import UserMenu from "../Components/UserMenu";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
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

}));


function Navbar() {
  const classes = useStyles();


  return (
    <AppBar position="fixed">
      <CssBaseline />
      <Toolbar>
        <Typography href="#" variant="h4" className={classes.logo}>
          <Link to="/" className={classes.logoLink}>Terranet</Link>
        </Typography>
        <nav >
          <ul className={classes.navlinks}>
            <li>
              <UserMenu />
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