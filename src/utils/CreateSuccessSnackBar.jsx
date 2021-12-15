import React, {useEffect, useState} from "react";
import { Snackbar, LinearProgress, Alert  } from '@mui/material';
import { Portal } from "./CreatePortal";
import { removePortal } from "./CreatePortal";

export default function SuccessSnackBar(props) {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 15));
    }, 800);


    const closePortal = setTimeout(() => {
      removePortal();
    }, 5600);
  
    return () => {
      clearInterval(timer);
      clearTimeout(closePortal);
    };
  }, []);

  return (
      <Portal>
      <Snackbar sx={{marginTop: "60px"}} open={true} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert severity="success" sx={{ width: '100%' }}>
        Post with id {props.id} has been {props.actionType} successfully!
        <LinearProgress variant="determinate" color="success" value={Number(progress)}  />
      </Alert>
    </Snackbar>
    </Portal>
  )
}