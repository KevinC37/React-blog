import React, { useState, forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Material UI Imports*/
import Add from '@material-ui/icons/Add';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import Logout from '@mui/icons-material/Logout';
import Home from '@material-ui/icons/Home';

/* Local Imports*/
import '../../../styles/navigation/Navigation.css';
import { store } from '../../../../storage/store';

export const NavMenu = forwardRef((props, ref) => {
  const [anchorEl, setAnchorEl] = useState(ref);
  let open = Boolean(anchorEl);
  let closeStatus = props.handleClose;

  useEffect(() => {
    setAnchorEl(ref);

    return () => {
      setAnchorEl(null);
    };
  }, [ref]);

  const logOut = () => store.dispatch({ type: 'USER/LOG_OUT' });
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={closeStatus}
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

      <MenuItem onClick={logOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
});
