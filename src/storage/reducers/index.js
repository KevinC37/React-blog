import { combineReducers } from "redux";
import menuReducer from "./menuReducer";


const allReducers = combineReducers({
  menu: menuReducer
})

export default allReducers;