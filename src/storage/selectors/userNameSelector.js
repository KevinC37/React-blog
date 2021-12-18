import { createSelector } from 'reselect';

const selectUserFirstName = state => state.user.firstName;
const selectUserLastName = state => state.user.lastName;

export const selectFirstName = createSelector([selectUserFirstName], firstName => ({ firstName }));
export const selectLastName = createSelector([selectUserLastName], lastName => ({ lastName }));
export const selectFullName = createSelector([selectUserFirstName, selectUserLastName], (firstName, lastName) => ({ fullName: `${firstName} ${lastName}` }))