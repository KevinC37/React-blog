import React, { useEffect, useState } from 'react';
import { Snackbar, LinearProgress, Alert } from '@mui/material';
import { Portal } from './CreatePortal';

export default function SuccessSnackBar({ id, actionType }) {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 15
      );
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <Portal key={id}>
      <Snackbar
        sx={{ marginTop: '60px' }}
        open={true}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Post with id {id} has been {actionType} successfully!
          <LinearProgress
            variant="determinate"
            color="success"
            value={Number(progress)}
          />
        </Alert>
      </Snackbar>
    </Portal>
  );
}
