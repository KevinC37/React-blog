import React from 'react';

/* React forms imports */
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

/* Material UI Imports */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/* Local imports */
import '../styles/pages/ContactUs.css';

export default function ContactPage() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please fill this field'),
    body: Yup.string().required('Please fill this field'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ title, body }) {
    const emailTo = 'm.cujba@yahoo.com';
    window.open(`mailto:${emailTo}?subject=${title}&body=${body}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form___main">
      <h2 className="form___header">Contact us</h2>
      <h3 className="form___header">We are all ears &#128066;</h3>

      <TextField
        type="title"
        error={!!errors.title}
        margin="normal"
        variant="outlined"
        label="Title"
        multiline
        minRows={1}
        maxRows={2}
        {...register('title')}
      />
      {errors.title && <p>{errors.title?.message}</p>}

      <TextField
        type="body"
        error={!!errors.body}
        margin="normal"
        variant="outlined"
        label="Body"
        multiline
        minRows={10}
        maxRows={10}
        {...register('body')}
      />
      {errors.body && <p>{errors.body?.message}</p>}

      <Button variant="contained" type="submit" color="primary" size="large">
        Send us your request
      </Button>
    </form>
  );
}
