import _ from 'lodash';

export function ADD_POSTS_TO_LOCAL_STORAGE() {
  if (_.isNull(window.localStorage.getItem('POSTS_ADDED'))) {
    window.localStorage.setItem('POSTS_ADDED', '[]')
  }
}