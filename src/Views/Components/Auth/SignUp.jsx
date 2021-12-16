import * as React from 'react';
import { useForm } from 'react-hook-form';
import '../../Styles/Auth_Pages/SignUp.css';
import { TextField, Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

export default function SignIn() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const redirect = useNavigate();
  const [submitStatus, setSubmitStatus] = useState(false); //for triggering the 'Success' popup

  function onSubmit(data) {
    const localStorage = window.localStorage;
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('password', data.password);

    setSubmitStatus(true);
    setTimeout(() => {
      redirect('/login');
      window.location.reload();
    }, 2000);
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
