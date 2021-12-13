import * as React from 'react';
import { useState, useEffect } from 'react';
import { MenuItem } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import './CardMenu.css';
import EditModal from '../Partials/EditModal';



export default function CardMenu(props) {
  const currentBlogpost = document.getElementById(`blogpost_id_${props.id}`);
  const	busMenuState	=	props.busMenuState;
  const menuState = props.menuState;
  const [editModalState, setEditModalState] = useState(false);

  useEffect(() => {
    console.log(editModalState);
  }, [editModalState])



  const busEditModalState = (e) => {
    e.stopPropagation();
    setEditModalState(!editModalState);
  }

  const hideMenu = (e) => {
    e.stopPropagation();
    busMenuState();
  }

  const API_DELETE_POST = async () => await (fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`, {
    method: 'DELETE'
  })).then(response => response.ok ? currentBlogpost.remove() : alert(`Something went wrong :(`));

  return (
    <div hidden={!menuState}>

    <div>
      <div className="card___menu" >
        <MenuItem  onClick={e => hideMenu(e)} onMouseDown={e => busEditModalState(e)} disableRipple>
          <Edit />
          <span>Edit</span>
        </MenuItem>
       
        <MenuItem  onClick={API_DELETE_POST} disableRipple>
          <Delete />
          <span>Delete</span>
        </MenuItem>
      </div>
    </div>
    {editModalState ? <EditModal {...props} editModalState={editModalState}  busEditModalState={e => busEditModalState(e)}/> : <></>}
    </div>
  )
  };