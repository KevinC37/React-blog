import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

/* Material UI Imports*/
import Add from '@material-ui/icons/Add';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import Logout from '@mui/icons-material/Logout';
import Home from '@material-ui/icons/Home';

/* Redux imports */
import { store } from '../../../../storage/store';
import { logOut } from '../../../../storage/actions';

/* Local Imports*/
import '../../../styles/navigation/Navigation.css';

export const NavMenu = forwardRef(({ handleClose }, ref) => {
  const [anchorEl, setAnchorEl] = useState(ref);
  let open = Boolean(anchorEl);

  useEffect(() => {
    setAnchorEl(ref);

    return () => {
      setAnchorEl(null);
    };
  }, [ref]);

  const userLogOut = useCallback(() => store.dispatch(logOut), []);

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      disableScrollLock
    >
      <Link to="/">
        <MenuItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          Home
        </MenuItem>
      </Link>

      <Link to="/add-post">
        <MenuItem>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          Add post
        </MenuItem>
      </Link>

      <Divider />

      <MenuItem onClick={userLogOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
});
