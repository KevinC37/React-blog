import * as React from 'react';
import { useState } from 'react';

/* Material UI Imports */
import { MenuItem } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

/* Local Imports */
import EditModal from '../Modals/EditModal.jsx';
import '../../../Styles/Components/Cards/CardMenu.css';
import SuccessSnackBar from '../../../../utils/CreateSuccessSnackBar';
import { SNACKBAR_SUCCCESS_MESSAGE_TYPE } from '../../../../GlobalVars';



export default function CardMenu(props) {
  const currentBlogpost = document.getElementById(`blogpost_id_${props.id}`);
  const	busMenuState	=	props.busMenuState;
  const menuState = props.menuState;
  const [editModalState, setEditModalState] = useState(false);
  const [postDeleteStatus, setPostDeleteStatus] = useState(false);

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
  })).then(response => {
    if(response.ok) {
      currentBlogpost.remove();
      setPostDeleteStatus(true);
    } 

    setTimeout(() => {
      setPostDeleteStatus(false);
  }, 6000)
  }
    )




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
    { postDeleteStatus ? <SuccessSnackBar id={props.id} actionType={SNACKBAR_SUCCCESS_MESSAGE_TYPE.DELETE} /> : ''}
    {editModalState ? <EditModal {...props} editModalState={editModalState}  busEditModalState={e => busEditModalState(e)}/> : <></>}
    </div>
  )
  };