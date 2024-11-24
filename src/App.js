import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard';
import Login from './Components/Login'
import AdminLoginPage from './Components/AdminLogin';
import ListTeacher from './Components/ListTeacher';
import QuizPage from './Components/QuizTest';
import StudentList from './Components/StudentList';
import StudentHeader from './Components/StudentHeader';

// Import Redux Provider and Store
import { Provider } from 'react-redux';
import store from './redux/Store/store'; // Import your store

function App() {
  return (
    // Wrap the entire app with Provider and pass the store
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/studentList' element={<StudentList />} />
          <Route path='/adminLogin' element={<AdminLoginPage />} />
          <Route path='/listTeacher' element={<ListTeacher />} />
          <Route path='/quiztest' element={<QuizPage />} />
          <Route path='/StudentHeader' element={<StudentHeader />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
