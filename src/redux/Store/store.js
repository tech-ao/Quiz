import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import studentReducer from "../Reducer/StudentReducer";


const rootReducer = combineReducers({ students: studentReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
