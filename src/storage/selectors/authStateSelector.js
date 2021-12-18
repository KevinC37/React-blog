import { createSelector } from 'reselect';

const selectAuth = state => state.user.auth;
const selectHasAccount = state => !!state.user.email;

export const selectAuthState = createSelector([selectAuth, selectHasAccount], (selectAuth, selectHasAccount) => selectAuth ? 'AUTHENTIFIED' : selectHasAccount ? 'LOG_IN' : 'SIGN_UP');

