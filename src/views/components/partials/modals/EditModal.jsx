import React, { useState, useCallback } from 'react';

/* Material UI Imports */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';

/* React hook form imports */
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

/* Utils imports */
import capitalize from '../../../../utils/textFormatters/capitalize';

/* Redux imports */
import { useStore } from 'react-redux';
import { editPost } from '../../../../storage/actions';

/* Local Imports */
import '../../../styles/modals/EditModal.css';
import { Portal } from '../../../../utils/CreatePortal';

/* Edit post modal --- patching the data */
const updatePost = async (data) =>
  await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export default function EditModal(props) {
  const reduxStore = useStore();

  const { title: postTitle, body: postBody, id, busEditModalState } = props;
  const title = capitalize(postTitle);
  const body = capitalize(postBody);

  const [postStatus, setPostStatus] = useState({
    status: 'Update post',
    btnColor: 'primary',
  });

  /* EDIT MODAL VALIDATION */
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Oops, the title cannot be empty'),
    body: Yup.string().required("Don't forget to add some content"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  /* Initializing REACT-HOOKS-FORM */
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleForm = useCallback(
    async (payload) => {
      try {
        const postToEdit = { ...payload, id };
        await updatePost(postToEdit);
        setPostStatus({ status: 'Success', btnColor: 'default' });
        reduxStore.dispatch(editPost(postToEdit));
      } catch (e) {
        setPostStatus({ status: `'Error': ${e}`, btnColor: 'secondary' });
      }
    },
    [id, reduxStore]
  );

  /* Closing the modal */
  const handleClose = useCallback(
    (e) => busEditModalState(e),
    [busEditModalState]
  );

  return (
    <Portal>
      <div
        className="edit___modal___container"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="edit___modal___wrapper">
          <div className="edit___modal___header">
            <h2 className="edit___modal___header___title">Edit post</h2>
            <Button
              className="edit___modal___header___close"
              onClick={(e) => handleClose(e)}
            >
              <Close />
            </Button>
          </div>
          <div className="edit___modal___body">
            <form
              className="edit___modal___form"
              onSubmit={handleSubmit(handleForm)}
            >
              <TextField
                {...register('title')}
                label="Title"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                defaultValue={title}
                margin="normal"
                multiline
                minRows={1}
                maxRows={2}
                size="small"
              />
              {errors.title ? <p>{errors.title?.message}</p> : null}
              <TextField
                {...register('body')}
                label="Body"
                variant="outlined"
                defaultValue={body}
                multiline
                minRows={4}
                margin="normal"
                maxRows={10}
                size="medium"
              />
              {errors.body ? <p>{errors.body?.message}</p> : null}
              <Button
                type="submit"
                className="edit___modal___form___submit___button"
                color={postStatus.btnColor}
                variant="contained"
              >
                {postStatus.status}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  );
}
