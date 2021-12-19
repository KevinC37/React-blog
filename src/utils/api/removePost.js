/* Redux imports*/
import { removePost } from '../../storage/actions/index.js';



const API_DELETE_POST = async (props, reduxStore) => {
  const currentBlogpost = document.getElementById(`blogpost_id_${props.id}`);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`, { method: 'DELETE' });

  const isInReduxStore = !!reduxStore.getState().post.posts.filter(element => element.id === props.id).length;
  if (isInReduxStore) {
    reduxStore.dispatch(removePost(props.id));
    currentBlogpost.remove();
  } else if (response.ok) {
    currentBlogpost.remove();
  }
};

export default API_DELETE_POST;