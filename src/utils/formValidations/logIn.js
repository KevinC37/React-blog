import * as Yup from 'yup';
import { store } from '../../storage/store';


const reduxStore = store.getState().user;
const { email: passedEmail, password: passedPassword } = reduxStore;


const logInValidationSchema =
  Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .matches(passedEmail, "Email doesn't match")
      .required("Don't forget your email"),
    password: Yup.string()
      .matches(passedPassword, 'Wrong password')
      .required('Add your password'),
  });

export default logInValidationSchema;
