import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { store } from '../../../storage/store';

/* Local imports */
import signUpValidationSchema from '../../../utils/formValidations/signUp';
import '../../styles/authPages/SignUp.css';

export default function SignUp() {
  const formOptions = { resolver: yupResolver(signUpValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [submitStatus, setSubmitStatus] = useState(false); //for triggering the 'Success' popup

  const redirect = useNavigate();
  let redirectTimer;

  useEffect(() => {
    return () => clearTimeout(redirectTimer);
  }, [redirectTimer]);

  function onSubmit(data) {
    store.dispatch({
      type: 'USER/SET_CREDENTIALS',
      payload: {
        auth: false,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      },
    });

    setSubmitStatus(true);
    redirectTimer = setTimeout(() => redirect('/login'), 2000);
  }

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
