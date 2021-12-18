import { combineReducers } from "redux";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import addPostReducer from "./addPostReducer";
import authReducer from "./authReducer";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'post'] // which reducer want to store
};

const allReducers = combineReducers({
  post: addPostReducer,
  user: authReducer
})


export default persistReducer(persistConfig, allReducers);