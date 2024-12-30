import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Login from './Components/Student/Login'
import AdminLoginPage from './Components/Admin/AdminLogin';
import ListTeacher from './Components/Teacher/ListTeacher';
import QuizPage from './Components/QuizTest';
import StudentList from './Components/Student/StudentList';
import StudentHeader from './Components/Student/StudentHeader';
import StudentDashboard from './Components/Student/StudentDashboard';
import Abacus from './Components/Abacus/Abacus';
import NotificationPage from './Components/Admin/Notification';
import RegisterStudent from './Components/Student/RegisterStudent';
import RegisterTeacher from './Components/Teacher/RegisterTeacher'
import EnrollmentRequestList from './Components/Admin/EnrollmentRequest';
import AdminSettings from './Components/Admin/AdminSetting';
import Students from './Components/Teacher/Student';
import QuestionListPage from './Components/Admin/Question';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Import Redux Provider and Store
import { Provider } from 'react-redux';
import store from './redux/Store/store'; // Import your store
import AddTeacher from './Components/Teacher/AddTeacher';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';

function App() {
  return (
    // Wrap the entire app with Provider and pass the store
    
    <Provider store={store}>
      <Router>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
       
          <Route path='/' element={<Login />} />
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/studentList' element={<StudentList />} />
          <Route path='/adminLogin' element={<AdminLoginPage />} />
          <Route path='/listTeacher' element={<ListTeacher />} />
          <Route path='/quiztest' element={<QuizPage />} />
          <Route path='/StudentHeader' element={<StudentHeader />} />
          <Route path='/StudentDashboard' element={<StudentDashboard />} />
          <Route path='/addTeacher' element={<AddTeacher />} />
          <Route path='/abacus' element={<Abacus />} />
          <Route path='/notification' element={<NotificationPage />} />
          <Route path='/registerStudent' element={<RegisterStudent />} />
          <Route path='/enrollmentRequest' element={<EnrollmentRequestList />} />
          <Route path='/adminSettings' element={<AdminSettings />} />
          <Route path='/teacherDashboard' element={<TeacherDashboard />} />
          <Route path='/questionListPage' element={<QuestionListPage />} />
          <Route path='/myStudents' element={<Students />} />
          <Route path='/registerTeacher' element={<RegisterTeacher />} />

      
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
