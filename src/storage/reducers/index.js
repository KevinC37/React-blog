import { combineReducers } from "redux";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import postsReducer from "./postsReducer";
import authReducer from "./authReducer";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'post'] // which reducer want to store
};

const allReducers = combineReducers({
  post: postsReducer,
  user: authReducer
})


export default persistReducer(persistConfig, allReducers);