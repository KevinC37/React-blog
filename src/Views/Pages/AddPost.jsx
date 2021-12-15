import React, {useEffect, useState} from "react";

/* React forms imports */
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

/* Material UI Imports */
import { TextField, Button } from "@material-ui/core";


/* Local imports */
import { addPostViaAPI } from "../../utils/API_CALLS/AddPost";
import SuccessSnackBar from '../../utils/CreateSuccessSnackBar.jsx'
import {SNACKBAR_SUCCCESS_MESSAGE_TYPE} from '../../GlobalVars/index.js'
import "../Styles/Components/AddPost.css"

export default function AddPost() {
  const [postAddedStatus, setPostAddedStatus] = useState(false); //for triggering the 'Success' popup
  const [postID, setPostID] = useState(null);
  const [userID, setUserID] = useState(null)
  const [postStatus, setPostStatus] = useState({status: 'Add post', btnColor: 'primary', disabled: false});

  const validationSchema = Yup.object().shape({
    title: Yup.string()
            .required("Oh, I think you forgot your title..."),
    body: Yup.string()
              .required(`Don't be shy, add some context to your post 😃`),
  })
  
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;


  const getData = async () => {
    const urls = [
      "https://jsonplaceholder.typicode.com/posts",
      "https://jsonplaceholder.typicode.com/users/"
    ];
    const requests = urls.map((url) => fetch(url, {method: 'GET'}));
    let result = [];
    Promise.all(requests)
      .then((responses) => {
        const errors = responses.filter((response) => !response.ok);
  
        if (errors.length > 0) {
          throw errors.map((response) => Error(response.statusText));
        }
  
        const json = responses.map((response) => response.json());
        return Promise.all(json);
      })
      .then(data => data.forEach( (datum, index) => (index === 0) ? setPostID(Date.now()) : setUserID(datum.length + 1)))
      .catch((errors) => {
        errors.forEach((error) => console.error(error));
      });

    return result;
  };

  useEffect(() => {
    getData();
  }, [])

  const pushPostToLocalStorage = (post) => {
    const getPostAddedStore =  Object.values(JSON.parse(window.localStorage.getItem('POSTS_ADDED') || '[]'));
    const firstName = window.localStorage.getItem('firstName') ;
    const lastName = window.localStorage.getItem('lastName')
    const postCopy = {...post}
    postCopy.author = lastName ? `${firstName}  ${lastName || ''}` : firstName;
    getPostAddedStore.push(postCopy);
    localStorage.setItem("POSTS_ADDED", JSON.stringify(getPostAddedStore));
  }


  async function submitData(post)  { 
    await addPostViaAPI(post);
    pushPostToLocalStorage(post);
    setPostAddedStatus(true);
   }

async function onSubmit(data) {
    const post = {userId: userID, id: postID, title: data.title, body: data.body}

    try{
      await submitData(post);;
      setPostStatus({status: 'Success! Post added', btnColor: 'default', disabled: true});
    } catch (e) {
      setPostStatus({status:`'Error': ${e}`, btnColor: 'secondary', disabled: false});
    }  
       
}



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form___main">
      <h2 className="form___header">Create post</h2>


     <TextField type="text" error={!!errors.title} margin="normal" variant="outlined" className="input___field" label="Blogpost Title" multiline minRows={1} maxRows={2} {...register("title")}/>
     {errors.title && <p>Title cannot be empty!</p>}

     <TextField type="text" error={!!errors.body} margin="normal" variant="outlined" className="input___field"  label="What's that you would like to share with us today?" multiline minRows={10} maxRows={10} {...register("body")} />
     {errors.body && <p>{errors.body?.message}</p>}


     <Button className="submit___button" type="submit" color={postStatus.btnColor} disabled={postStatus.disabled} variant="contained" > {postStatus.status}</Button>
    {postAddedStatus 
      ? <div>
        <SuccessSnackBar id={postID}  actionType={SNACKBAR_SUCCCESS_MESSAGE_TYPE.ADD}/>
        </div> 
      : ""}
    </form>
  );
}