import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import studentReducer from '../Reducer/StudentReducer';
import profileReducer from '../Reducer/ProfileReducer'; // Import your profile reducer

const rootReducer = combineReducers({
  students: studentReducer,
  profile: profileReducer // Include the profile reducer here
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Correct middleware usage

export default store;
