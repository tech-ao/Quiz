import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import studentReducer from '../Reducer/StudentReducer';
import profileReducer from '../Reducer/ProfileReducer';
import passwordReducer from '../Reducer/PasswordReducer'
// Import your profile reducer

const rootReducer = combineReducers({
  students: studentReducer,
  profile: profileReducer,
  passwordChange: passwordReducer
   // Include the profile reducer here
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Correct middleware usage

export default store;
