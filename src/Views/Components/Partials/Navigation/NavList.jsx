import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/* Utils imports */
import capitalize from '../../../../utils/textFormatters/capitalize.js';

/* Material UI Imports*/
import { makeStyles } from '@material-ui/core';
import { Avatar } from '@mui/material';

/* Local imports */
import { NavMenu } from './NavMenu.jsx';
import { selectAuthState } from '../../../../storage/selectors/authStateSelector.js';
import { selectFirstName } from '../../../../storage/selectors/userNameSelector.js';

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

function NavList({ authStatus, user }) {
  const classes = useStyles();
  const { firstName: userName } = user;
  const reference = useRef(null);
  useEffect(() => {}, [authStatus]);
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
    <ul className={classes.navlinks}>
      <li>
        {authStatus === 'AUTHENTIFIED' ? (
          <div
            ref={reference}
            onClick={(e) => handleClick(e)}
            className={classes.user___profile}
          >
            <Avatar className="avatar" />
            <span>{userName ? capitalize(userName) : ''}</span>
            {anchorEl ? (
              <NavMenu handleClose={handleClose} ref={anchorEl} />
            ) : (
              <></>
            )}
          </div>
        ) : authStatus === 'LOG_IN' ? (
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
  );
}

const mapStateToProps = createStructuredSelector({
  authStatus: selectAuthState,
  user: selectFirstName,
});

export default connect(mapStateToProps)(NavList);
