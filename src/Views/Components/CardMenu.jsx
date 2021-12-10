import * as React from 'react';
import { useState } from 'react';
import { MenuItem } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import './CardMenu.css';
import EditModal from '../Partials/EditModal';

export default function CardMenu() {
  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

  function handleEdit() {
   setEditPost(!editPost);
  }

  function handleDelete() {
    setDeletePost(!deletePost)
  }

  return (
    <div className="card___menu">
        <MenuItem  onClick={handleEdit} disableRipple>
          <Edit/>
          <span>Edit</span>
        </MenuItem>
        <MenuItem  onClick={handleDelete} disableRipple>
          <Delete />
          <span>Delete</span>
        </MenuItem>
        {editPost ? <EditModal /> : ""}
    </div>
  );
}