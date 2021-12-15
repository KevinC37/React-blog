import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

/* Material UI Imports*/
import { makeStyles } from '@material-ui/core';
import { Avatar } from '@mui/material';

/* Local imports */
import UserMenu from './UserMenu.jsx';
import { NavMenu } from './UserMenu.jsx';

const useStyles = makeStyles((theme) => ({
  user___profile: {
    display: 'flex',
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
    marginLeft: theme.spacing(10),
  },
  navlinks: {
    marginLeft: theme.spacing(10),
    display: 'flex',
    cursor: 'pointer',
    listStyle: 'none',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
    marginLeft: theme.spacing(10),
    '&:hover': {
      color: 'yellow',
      borderBottom: '1px solid white',
    },
  },
}));

export default function NavList() {
  const classes = useStyles();
  const auth = localStorage.getItem('auth');
  const hasAccount = localStorage.getItem('email');
  const user = localStorage.getItem('firstName');
  const reference = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(e) {
    if (reference.current.contains(e.target)) {
      setAnchorEl(reference.current);
    }
  }

  function handleClose() {
    return setAnchorEl(null);
  }

  return (
    <>
      <ul className={classes.navlinks}>
        <li>
          {auth ? (
            <div
              ref={reference}
              onClick={(e) => handleClick(e)}
              className={classes.user___profile}
            >
              <Avatar className="avatar" />
              <span>{user ? _.capitalize(user) : ''}</span>
              {anchorEl ? (
                <NavMenu handleClose={handleClose} ref={anchorEl} />
              ) : (
                <></>
              )}
            </div>
          ) : hasAccount ? (
            <Link to="/login" className={classes.link}>
              Log in
            </Link>
          ) : (
            <Link to="/signup" className={classes.link}>
              Sign up
            </Link>
          )}
        </li>
        <li>
          <Link to="/about" className={classes.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={classes.link}>
            Contact Us
          </Link>
        </li>
      </ul>
    </>
  );
}
