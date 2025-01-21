import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Login from './Components/Student/Login';
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
import OnlineClassShedule from './Components/Teacher/OnlineClassShedule';
import PaymentHistory from './Components/Teacher/PaymentHistory';
import ForgotPassword from './Components/Student/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Redux Provider and Store
import { Provider } from 'react-redux';
import store from './redux/Store/store';
import AddTeacher from './Components/Teacher/AddTeacher';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';
import AdminAttendance from './Components/Admin/AdminAttendance';
import Quiz from './Components/Admin/Quiz';
import Test from './Components/Student/Test';
import StudentCertificate from './Components/Student/StudentCertificate';
import StudentOnlineClass from './Components/Student/StudentOnlineClass';
import StudentSettings from './Components/Student/StudentSettings';
import Announcements from './Components/Teacher/Announcements';
import TeacherSettings from './Components/Teacher/TeacherSettings';
import AbacusMath from './Components/Admin/Abacus';
import AbacusSidePanel from './Components/Admin/AbacusSidePannel';

// ProtectedRoute component to check login status
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  return isLoggedIn ? element : <Navigate to="/adminLogin" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminLogin" element={<AdminLoginPage />} />
          <Route path="/registerTeacher" element={<RegisterTeacher />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/registerStudent" element={<RegisterStudent />} />
          <Route path ="/adminAttendance" element={<AdminAttendance/>}/>

          {/* Protected Routes */}
          <Route path="/adminDashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/studentList" element={<ProtectedRoute element={<StudentList />} />} />
          <Route path="/listTeacher" element={<ProtectedRoute element={<ListTeacher />} />} />
          <Route path="/quiztest" element={<ProtectedRoute element={<QuizPage />} />} />
          <Route path="/onlineClass" element={<ProtectedRoute element={<OnlineClass />} />} />
          <Route path="/StudentHeader" element={<ProtectedRoute element={<StudentHeader />} />} />
          <Route path="/StudentDashboard" element={<ProtectedRoute element={<StudentDashboard />} />} />
          <Route path="/addTeacher" element={<ProtectedRoute element={<AddTeacher />} />} />
          <Route path="/abacus" element={<ProtectedRoute element={<Abacus />} />} />
          <Route path="/notification" element={<ProtectedRoute element={<NotificationPage />} />} />
          <Route path="/enrollmentRequest" element={<ProtectedRoute element={<EnrollmentRequestList />} />} />
          <Route path="/adminSettings" element={<ProtectedRoute element={<AdminSettings />} />} />
          <Route path="/teacherDashboard" element={<ProtectedRoute element={<TeacherDashboard />} />} />
          <Route path="/questionListPage" element={<ProtectedRoute element={<QuestionListPage />} />} />
          <Route path="/myStudents" element={<ProtectedRoute element={<Students />} />} />
          <Route path="/attendance" element={<ProtectedRoute element={<StudentAttendanceList />} />} />
          <Route path="/attendanceData" element={<ProtectedRoute element={<AttendanceDataPage />} />} />
          <Route path="/paymentHistory" element={<ProtectedRoute element={<PaymentHistory />} />} />
          <Route path="/onlineClassShedule" element={<ProtectedRoute element={<OnlineClassShedule />} />} />
          <Route path="/quiz" element={<ProtectedRoute element={<Quiz />} />} />
          <Route path="/test" element={<ProtectedRoute element={<Test />} />} />
          <Route path="/studentcertificate" element={<ProtectedRoute element={<StudentCertificate />} />} />
          <Route path="/studentOnlineClass" element={<ProtectedRoute element={<StudentOnlineClass />} />} />
          <Route path="/studentSettings" element={<ProtectedRoute element={<StudentSettings />} />} />
          <Route path="/Announcements" element={<ProtectedRoute element={<Announcements />} />} />
          <Route path="/TeacherSettings" element={<ProtectedRoute element={<TeacherSettings />} />} />
          <Route path="/AbacusMath" element={<ProtectedRoute element={<AbacusMath />} />} />
          <Route path="/AbacusSidePanel" element={<ProtectedRoute element={<AbacusSidePanel />} />} />







        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
