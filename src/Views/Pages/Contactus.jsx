import React from 'react';
import '../Styles/body.css';

/* React forms imports */
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

/* Material UI Imports */
import { TextField, Button } from '@material-ui/core';

const EMAIL_TO = `m.cujba@yahoo.com`;

function ContactPage() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please fill this field'),
    body: Yup.string().required('Please fill this field'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    window.open(`mailto:${EMAIL_TO}?subject=${data.title}&body=${data.body}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form___main">
      <h2 className="form___header">Contact us</h2>
      <h3 className="form___header">We are all ears</h3>

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

      <Button variant="contained" type="submit" color="primary">
        Send us your request
      </Button>
    </form>
  );
}

export default ContactPage;
