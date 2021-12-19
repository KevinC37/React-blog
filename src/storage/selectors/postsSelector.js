import { createSelector } from 'reselect';

export const postsSelector = state => state.post.posts;

export const postsSelect = createSelector([postsSelector], postsSelector => postsSelector);