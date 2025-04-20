import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import studentReducer from '../Reducer/StudentReducer';
import profileReducer from '../Reducer/ProfileReducer';
import teacherReducer from '../Reducer/TeacherReducer';
import passwordReducer from '../Reducer/PasswordReducer'
import sheduleReducer from "../Reducer/SheduleReducer";
// Import your profile reducer

const rootReducer = combineReducers({
  students: studentReducer,
  profile: profileReducer,
  passwordChange: passwordReducer,
  teachers: teacherReducer,
  shedules : sheduleReducer
   // Include the profile reducer here
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Correct middleware usage

export default store;
