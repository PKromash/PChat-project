import {combineReducers} from "redux";
import posts from "./posts";
import userReducer from "./auth";

export default combineReducers({
  posts,
  userReducer,
});
