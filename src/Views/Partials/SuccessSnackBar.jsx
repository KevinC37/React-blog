import React from "react";
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { Portal } from "../../utils/CreatePortal";

export default function SuccessSnackBar(props) {
  
  return (
  <Portal>
    <Snackbar sx={{marginTop: "60px"}} open={true} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
    <Alert severity="success" sx={{ width: '100%' }}>
      Post with id {props.id} has been deleted successfully!
    </Alert>
  </Snackbar>
  </Portal>
  )
}