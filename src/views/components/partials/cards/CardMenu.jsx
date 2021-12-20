import React, { useState, useCallback, useEffect } from 'react';

/* Material UI Imports */
import { MenuItem } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

/* Redux imports */
import { useStore } from 'react-redux';

/* Global variable imports */
import { SNACKBAR_SUCCESS_TIMEOUT } from '../../../../globalVars';
import { SNACKBAR_SUCCCESS_MESSAGE_TYPE } from '../../../../globalVars';

/* Local Imports */
import EditModal from '../modals/EditModal.jsx';
import '../../../styles/components/cards/CardMenu.css';
import SuccessSnackBar from '../../../../utils/CreateSuccessSnackBar';
import API_DELETE_POST from '../../../../utils/api/removePost.js';

export default function CardMenu(props) {
  const busMenuState = props.busMenuState;
  const menuState = props.menuState;
  const [editModalState, setEditModalState] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const reduxStore = useStore();

  const busEditModalState = useCallback(
    (e) => {
      e.stopPropagation();
      setEditModalState(!editModalState);
    },
    [editModalState]
  );

  const hideMenu = useCallback(
    (e) => {
      e.stopPropagation();
      busMenuState();
    },
    [busMenuState]
  );

  useEffect(() => {
    //initializing the timer to close snackbar
    let timer;
    if (showSnackbar) {
      timer = setTimeout(
        () => setShowSnackbar(false),
        SNACKBAR_SUCCESS_TIMEOUT
      );
      console.log(showSnackbar);
    }

    //on unmount - clear the snackbar timer
    return () => clearTimeout(timer);
  }, [showSnackbar]);

  const deletePost = useCallback(() => {
    API_DELETE_POST(props, reduxStore);
    setShowSnackbar(true);
  }, [props, reduxStore]);

  return (
    <>
      <div hidden={!menuState}>
        <div>
          <div className="card___menu">
            <MenuItem
              onClick={(e) => hideMenu(e)}
              onMouseDown={(e) => busEditModalState(e)}
              disableRipple
            >
              <Edit />
              <span>Edit</span>
            </MenuItem>

            <MenuItem onClick={deletePost} disableRipple>
              <Delete />
              <span>Delete</span>
            </MenuItem>
          </div>
        </div>

        {editModalState ? (
          <EditModal
            {...props}
            editModalState={editModalState}
            busEditModalState={(e) => busEditModalState(e)}
          />
        ) : (
          <></>
        )}
      </div>

      {showSnackbar ? (
        <SuccessSnackBar
          id={props.id}
          actionType={SNACKBAR_SUCCCESS_MESSAGE_TYPE.DELETE}
        />
      ) : (
        <></>
      )}
    </>
  );
}
