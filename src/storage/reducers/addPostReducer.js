const INITIAL_STATE = {
  posts: []
}

const addPostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "POSTS/ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    default:
      return state;
  }
}

export default addPostReducer;