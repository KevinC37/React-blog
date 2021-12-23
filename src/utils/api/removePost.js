/* Redux imports*/
import { removePost } from '../../storage/actions/index.js';

const API_DELETE_POST = async ({ id }, reduxStore) => {
  const currentBlogpost = document.getElementById(`blogpost_id_${id}`);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });

  const isInReduxStore = !!reduxStore.getState().post.posts.filter(element => element.id === id).length;
  if (isInReduxStore) {
    reduxStore.dispatch(removePost(id));
    currentBlogpost.remove();
  } else if (response.ok) {
    currentBlogpost.remove();
  }
};

export default API_DELETE_POST;