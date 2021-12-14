import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import _ from 'lodash';

/* Material UI Imports*/
import Add from '@material-ui/icons/Add'
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import { ListItemIcon } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import Logout from '@mui/icons-material/Logout';
import { makeStyles } from "@material-ui/core";
import { Avatar } from "@mui/material";
import Home from '@material-ui/icons/Home';

/* Local Imports*/
import "../../Styles/Navigation/Navigation.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: '',
    zIndex: 0,
  },
  user___profile: {
    display: "flex",
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    marginLeft: theme.spacing(10),
  },
}) )

export default function UserMenu() {
  const classes = useStyles();
  const auth = localStorage.getItem('auth');
  const hasAccount = localStorage.getItem('email');
  const user = localStorage.getItem('firstName');

  const divRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  function handleClick() {
    setAnchorEl(divRef.current);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
<div >
  {auth
  ? <div className={classes.user___profile}  ref={divRef} onMouseDown={handleClick} >
      <Avatar className="avatar" /> {user ? _.capitalize(user) : ''}
   
 
    <Menu open={open} anchorEl={anchorEl} onClick={handleClose} disableScrollLock>
    
      <Link to="/">
        <MenuItem>
          <ListItemIcon>
            <Home/> 
          </ListItemIcon>
          Home
        </MenuItem>
      </Link>

      <Link to="/add-post">
      <MenuItem>
      <ListItemIcon>
        <Add/> 
      </ListItemIcon>
        Add post
      </MenuItem>
      </Link>
      
      <MenuItem>
      <ListItemIcon>
        <Person /> 
      </ListItemIcon>
        My account
      </MenuItem>

    <Divider />

      <MenuItem>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
  </Menu>
  </div>
  : hasAccount
  ?
  <Link to="/login" className={classes.link}>Log in</Link>

  :
  <Link to="/signup" className={classes.link}>Sign up</Link>
  }

</div>
  )
}