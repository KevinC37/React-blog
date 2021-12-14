import React from "react";
import { Snackbar, LinearProgress, Alert  } from '@mui/material';
import { Portal } from "./CreatePortal";

export default function SuccessSnackBar(props) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 15));
    }, 800);
    return () => {
      clearInterval(timer);
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