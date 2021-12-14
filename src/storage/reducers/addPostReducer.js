const addPostReducer = (state = { author: '', title: '', body: '' }, action) => {
  switch (action.type) {
    case "POSTS/ADD_POST":
      return {
        ...state,
        author: action.payload.author,
        title: action.payload.title,
        body: action.payload.body
      }
    default:
      return state;
  }
}

export default addPostReducer;