const menuReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return !state;

    case 'CLOSE_MENU':
      return false

    default:
      return state;
  }
}

export default menuReducer;