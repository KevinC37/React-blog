import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/* React forms imports */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* Material UI Imports */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

/* Redux imports */
import { store } from '../../storage/store.js';
import { logIn } from '../../storage/actions/index.js';

/* Local imports */
//----Form validations //
import logInValidationSchema from '../../utils/formValidations/logIn.js';
//----CSS Files //
import '../styles/authPages/LogIn.css';

export default function LogIn() {
  const redirect = useNavigate();
  let redirectTimer;
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false); //for triggering the Submit Status popup

  const formOptions = { resolver: yupResolver(logInValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  if (redirectToHome) {
    redirectTimer = setTimeout(() => redirect('/'), 2000);
  }

  useEffect(() => {
    return () => clearTimeout(redirectTimer);
  }, [redirectTimer]);

  const onSubmit = useCallback(() => {
    store.dispatch(logIn);
    setSubmitStatus(true);
    setRedirectToHome(!redirectToHome);
  }, [redirectToHome]);

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
      ) : null}
    </form>
  );
}
