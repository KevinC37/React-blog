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