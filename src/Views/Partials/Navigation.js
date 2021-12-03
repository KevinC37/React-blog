import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
    cursor: "pointer",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));


function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography href="#" variant="h4" className={classes.logo}>
          Terranet
        </Typography>
        <BrowserRouter>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Blogposts
            </Link>
          </div>

          <div className={classes.navlinks}>
            <Link to="/about" className={classes.link}>
              About
            </Link>
          </div>

          <div className={classes.navlinks}>
            <Link to="/contact" className={classes.link}>
              Contact us
            </Link>
          </div>

        </BrowserRouter>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;