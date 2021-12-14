import { combineReducers } from "redux";
import addPostReducer from "./addPostReducer";

const allReducers = combineReducers({
  post: addPostReducer
})

export default allReducers;