import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* React hook form imports*/
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* Redux imports */
import { store } from '../../storage/store.js';
import { signUp } from '../../storage/actions/index.js';

/* MUI Imports */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

/* Local imports */
//----Form validations //
import signUpValidationSchema from '../../utils/formValidations/signUp.js';
//----CSS Files //
import '../styles/authPages/SignUp.css';

export default function SignUp() {
  const redirect = useNavigate();
  let redirectTimer;
  const [redirectToLogIn, setRedirectToLogIn] = useState(false);

  const formOptions = { resolver: yupResolver(signUpValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [submitStatus, setSubmitStatus] = useState(false); //for triggering the 'Success' popup

  if (redirectToLogIn) {
    redirectTimer = setTimeout(() => redirect('/blog/login'), 2000);
  }
  useEffect(() => {
    return () => clearTimeout(redirectTimer);
  }, [redirectTimer]);

  const onSubmit = useCallback(
    (data) => {
      store.dispatch(signUp(data));
      setSubmitStatus(true);
      setRedirectToLogIn(!redirectToLogIn);
    },
    [redirectToLogIn]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form___main">
      <h2 className="form___header">
        Hurry up and sign up <span>&#128513;</span>
      </h2>
      <TextField
        id="firstName"
        type="text"
        error={!!errors.firstName}
        margin="normal"
        variant="outlined"
        className="input___field"
        label="First name"
        {...register('firstName')}
      />
      {errors.firstName && <p>{errors.firstName?.message}</p>}

      <TextField
        type="text"
        error={!!errors.lastName}
        margin="normal"
        variant="outlined"
        className="input___field"
        label="Last name"
        {...register('lastName')}
      />
      {errors.lastName && <p>{errors.lastName?.message}</p>}

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

      <TextField
        type="password"
        error={!!errors.confirmPassword}
        margin="normal"
        variant="outlined"
        className="input___field"
        label="Confirm Password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}

      <Button
        variant="contained"
        type="submit"
        className="submit___button"
        color="primary"
      >
        Sign up
      </Button>
      {submitStatus ? (
        <div>
          <Snackbar
            open={submitStatus}
            autoHideDuration={2000}
            message="Signed up!"
          />
        </div>
      ) : null}
    </form>
  );
}
