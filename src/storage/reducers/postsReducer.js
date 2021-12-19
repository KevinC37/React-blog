const INITIAL_STATE = {
  posts: []
}

const editPost = (originalPost, edittedPost) => {
  originalPost.title = edittedPost.title;
  originalPost.body = edittedPost.body;
  return originalPost;
}

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "POSTS/ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case "POSTS/REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id)
      }
    case "POSTS/EDIT_POST":
      return {
        ...state,
        posts: state.posts.map(post => Number(post.id) === Number(action.payload.id) ? post = editPost(post, action.payload) : post)
      }
    default:
      return state;
  }
}

export default postsReducer;