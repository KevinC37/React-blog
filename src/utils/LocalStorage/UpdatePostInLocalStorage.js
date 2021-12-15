import _ from 'lodash';

export default function UpdatePostInLocalStorage(props, updatedData) {
  let localStore = JSON.parse(window.localStorage.getItem('POSTS_ADDED'));
  let updateLocalStorage = [];

  const isLocalStorage = !!_.filter(
    localStore,
    (post) => Number(post.id) === Number(props.id)
  ).length;

  if (isLocalStorage) {
    _.forEach(localStore, (post) =>
      Number(post.id) === Number(props.id)
        ? updateLocalStorage.push({
          title: updatedData.title,
          body: updatedData.body,
          id: post.id,
          userId: post.userId,
          author: post.author,
        })
        : updateLocalStorage.push(post)
    );

    return window.localStorage.setItem('POSTS_ADDED', JSON.stringify(updateLocalStorage));
  }

  return;
}