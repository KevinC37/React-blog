import * as Yup from 'yup';

const addPostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Oh, I think you forgot your title..."),
  body: Yup.string()
    .required(`Don't be shy, add some context to your post 😃`),
})

export default addPostValidationSchema;