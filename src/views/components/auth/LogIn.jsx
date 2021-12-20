import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* React forms imports */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* Material UI Imports */
import { TextField, Button } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';

/* Local imports */
import '../../styles/authPages/LogIn.css';
import logInValidationSchema from '../../../utils/formValidations/logIn';
import { store } from '../../../storage/store';
import { useEffect } from 'react';

function LogIn() {
  const formOptions = { resolver: yupResolver(logInValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const redirect = useNavigate();
  const [submitStatus, setSubmitStatus] = useState(false); //for triggering the 'Success' popup

  let redirectTimer;

  useEffect(() => {
    return () => clearTimeout(redirectTimer);
  }, [redirectTimer]);

  function onSubmit() {
    store.dispatch({ type: 'USER/LOGIN' });
    setSubmitStatus(true);
    redirectTimer = setTimeout(() => redirect('/'), 2000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form___main">
      <h2 className="form___header">Log in here &#128515;</h2>

      <TextField
        type="email"
        error={!!errors.email}
        margin="normal"
        variant="outlined"
        className="input___field"
        label="Email"
        {...register('email')}
      />
      {errors.email && <p>{errors.email?.message}</p>}

      <TextField
        type="password"
        error={!!errors.password}
        margin="normal"
        variant="outlined"
        className="input___field"
        label="Password"
        {...register('password')}
      />
      {errors.password && <p>{errors.password?.message}</p>}

      <Button
        variant="contained"
        type="submit"
        className="submit___button"
        color="primary"
      >
        Log in
      </Button>
      {submitStatus ? (
        <div>
          <Snackbar
            open={submitStatus}
            autoHideDuration={2000}
            message="Welcome!"
          />
        </div>
      ) : (
        ''
      )}
    </form>
  );
}

export default LogIn;
