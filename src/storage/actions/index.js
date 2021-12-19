export const openMenu = id => ({
  type: 'OPEN_MENU',
  id
})

export const CloseMenu = id => ({
  type: 'CLOSE_MENU',
  id
})

export const AddPost = data => ({
  type: 'POSTS/ADD_POST',
  payload: { author: data.author, title: data.title, body: data.body }
})

export const signUp = credentials => ({
  type: 'USER/CRENEDTIALS',
  payload: { auth: false, email: credentials.email, firstName: credentials.firstName, lastName: credentials.lastName, password: credentials.password }
})

export const addPost = post => ({
  type: 'POSTS/ADD_POST',
  payload: {
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
    user: {
      name: post.author,
    }
  }

})

export const removePost = id => ({
  type: 'POSTS/REMOVE_POST',
  payload: {
    id
  }
})

export const editPost = post => ({
  type: 'POSTS/EDIT_POST',
  payload: {
    id: post.id,
    title: post.title,
    body: post.body,
  }
})

export const logOut = { type: 'USER/LOG_OUT' }