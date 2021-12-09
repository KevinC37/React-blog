import * as React from "react";
import { useForm } from "react-hook-form";
import './SignUp.css';
import { TextField, Button } from "@material-ui/core";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@material-ui/core";



export default function SignIn() {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
            .email('Invalid email')
            .matches(email, "Email doesn't match")
            .required("Don't forget your email"),
    password: Yup.string()
              .matches(password, "Wrong password")
              .required('Add your password'),
  })
  
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const redirect = useNavigate();
  const [submitStatus, setSubmitStatus] = useState(false); //for triggering the 'Success' popup

 

  function onSubmit(data) {
    const localStorage = window.localStorage;
    localStorage.getItem('email');
    localStorage.getItem('password')
    localStorage.setItem('auth', true);
    setSubmitStatus(true); 
    setTimeout(() => {
      redirect("/");
      window.location.reload();
    }, 2000)
  }

    

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form___main">
      <h2 className="form___header">Log in here 	&#128515;</h2>


     <TextField type="email" error={!!errors.email} margin="normal" variant="outlined" className="input___field" label="Email" {...register("email")} />
     {errors.email && <p>{errors.email?.message}</p>}

     <TextField type="password" error={!!errors.password} margin="normal" variant="outlined" className="input___field" label="Password" {...register("password")} />
     {errors.password && <p>{errors.password?.message}</p>}


    <Button variant="contained" type="submit" className="submit___button" color="primary">Log in</Button>
    {    submitStatus ? <div>
        <Snackbar
        open={submitStatus}
        autoHideDuration={2000}
        message="Welcome!"
        
      />
          </div> : ""}
    </form>
  );
}