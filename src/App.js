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
import RegisterTeacher from './Components/Teacher/RegisterTeacher';
import EnrollmentRequestList from './Components/Admin/EnrollmentRequest';
import AdminSettings from './Components/Admin/AdminSetting';
import Students from './Components/Teacher/Student';
import QuestionListPage from './Components/Admin/Question';
import OnlineClass from './Components/Admin/OnlineClass';
import StudentAttendanceList from './Components/Teacher/Attendance';
import AttendanceDataPage from './Components/Teacher/AttendanceByDate';
import OnlineClassShedule from './Components/Teacher/OnlineClassShedule'
import PaymentHistory from './Components/Teacher/PaymentHistory';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Redux Provider and Store
import { Provider } from 'react-redux';
import store from './redux/Store/store'; // Import your store
import AddTeacher from './Components/Teacher/AddTeacher';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';

// ProtectedRoute component to check login status
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // Check login status

  return isLoggedIn ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/adminLogin' element={<AdminLoginPage />} />

          {/* Protected Routes */}
          <Route path='/adminDashboard' element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path='/studentList' element={<ProtectedRoute element={<StudentList />} />} />
          <Route path='/listTeacher' element={<ProtectedRoute element={<ListTeacher />} />} />
          <Route path='/quiztest' element={<ProtectedRoute element={<QuizPage />} />} />
          <Route path='/onlineClass' element={<ProtectedRoute element={<OnlineClass />} />} />
          <Route path='/StudentHeader' element={<ProtectedRoute element={<StudentHeader />} />} />
          <Route path='/StudentDashboard' element={<ProtectedRoute element={<StudentDashboard />} />} />
          <Route path='/addTeacher' element={<ProtectedRoute element={<AddTeacher />} />} />
          <Route path='/abacus' element={<ProtectedRoute element={<Abacus />} />} />
          <Route path='/notification' element={<ProtectedRoute element={<NotificationPage />} />} />
          <Route path='/enrollmentRequest' element={<ProtectedRoute element={<EnrollmentRequestList />} />} />
          <Route path='/adminSettings' element={<ProtectedRoute element={<AdminSettings />} />} />
          <Route path='/teacherDashboard' element={<ProtectedRoute element={<TeacherDashboard />} />} />
          <Route path='/questionListPage' element={<ProtectedRoute element={<QuestionListPage />} />} />
          <Route path='/myStudents' element={<ProtectedRoute element={<Students />} />} />
          <Route path='/registerTeacher' element={<RegisterTeacher />} />
          <Route path='/registerStudent' element={<RegisterStudent />} />
          <Route path='/attendance' element={<ProtectedRoute element={<StudentAttendanceList />} />} />
          <Route path='/attendanceData' element={<ProtectedRoute element={<AttendanceDataPage />} />} />
          <Route path='/paymentHistory' element={<ProtectedRoute element={<PaymentHistory />} />} />
          <Route path='/onlineClassShedule' element={<ProtectedRoute element={<OnlineClassShedule />} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
