const INITIAL_STATE = { auth: false, email: null, firstName: null, lastName: null, password: null }

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER/SET_CREDENTIALS':
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        password: action.payload.password,
      }
    case 'USER/LOGIN':
      return {
        ...state,
        auth: true
      }
    case 'USER/LOG_OUT':
      return {
        ...state,
        auth: false
      }
    default:
      return state;
  }
}

export default authReducer;