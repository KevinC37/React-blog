import React, { useState, useCallback, useEffect } from 'react';

/* Material UI Imports */
import MenuItem from '@material-ui/core/MenuItem';
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
  const reduxStore = useStore();
  let snackbarTimer;
  const { busMenuState, menuState, id: postId } = props;

  const [editModalState, setEditModalState] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

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
    return () => {
      clearTimeout(snackbarTimer);
    };
  });

  const deletePost = useCallback(() => {
    API_DELETE_POST(props, reduxStore);
    setShowSnackbar(true);
  }, [props, reduxStore]);

  //initializing the timer to close snackbar
  if (showSnackbar) {
    snackbarTimer = setTimeout(
      () => setShowSnackbar(false),
      SNACKBAR_SUCCESS_TIMEOUT
    );
  }
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
        ) : null}
      </div>

      {showSnackbar ? (
        <SuccessSnackBar
          id={postId}
          actionType={SNACKBAR_SUCCCESS_MESSAGE_TYPE.DELETE}
        />
      ) : null}
    </>
  );
}
