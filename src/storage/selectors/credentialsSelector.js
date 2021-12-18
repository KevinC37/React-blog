import { createSelector } from 'reselect';

const selectEmail = state => state.user.email;
const selectPassword = state => state.user.password;
export const selectCredentials = createSelector([selectEmail, selectPassword], (selectEmail, selectPassword) => ({ email: selectEmail, password: selectPassword }));
