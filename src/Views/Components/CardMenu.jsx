import * as React from 'react';

import { MenuItem } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import './CardMenu.css';

export default function CardMenu() {

  return (
    <div className="card___menu">

        <MenuItem disableRipple>
          <Edit />
          <span>Edit</span>
        </MenuItem>
        <MenuItem disableRipple>
          <Delete />
          <span>Delete</span>
        </MenuItem>

    </div>
  );
}