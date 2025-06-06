import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ImportQuestion from "./Components/Admin/ImportQuestion";
import ScheduleForm from "./Components/Admin/ScheduleForm";
import AddQuestion from "./Components/Admin/AddQuestion";
import AssignedClass from "./Components/Admin/AssignedClass";
import CompleteClass from "./Components/Admin/completeClass.js";
import Createmeeting from "./Components/Admin/CreateMeeting.js";
import FeesPayment from "./Components/Admin/FeesPayment.js";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Login from "./Components/Student/Login";
import AdminLoginPage from "./Components/Admin/AdminLogin";
import ListTeacher from "./Components/Teacher/ListTeacher";
import QuizPage from "./Components/QuizTest";
import RegisteredStudents from "./Components/Admin/RegisteredStudent.js"
import StudentList from "./Components/Student/StudentList";
import Assigned_class from "./Components/Student/Assigned_class.js";
import Completed_class from "./Components/Student/completed_class.js";
import StudentHeader from "./Components/Student/StudentHeader";
import StudentDashboard from "./Components/Student/StudentDashboard";
import Abacus from "./Components/Abacus/Abacus";
import NotificationPage from "./Components/Admin/Notification";
import RegisterStudent from "./Components/Student/RegisterStudent";
import RegisterTeacher from "./Components/Teacher/RegisterTeacher";
import TeacherFirstLogin from "./Components/Teacher/TeacherFirstLogin";
import EnrollmentRequestList from "./Components/Admin/EnrollmentRequest";
import TeacherEnrollment from "./Components/Admin/TeacherEnrollment";
import AdminSettings from "./Components/Admin/AdminSetting";
import Students from "./Components/Teacher/Student";
import QuestionListPage from "./Components/Admin/Question";
import OnlineClass from "./Components/Admin/OnlineClass";
import StudentAttendanceList from "./Components/Teacher/Attendance";
import AttendanceDataPage from "./Components/Teacher/AttendanceByDate";
import OnlineClassShedule from "./Components/Teacher/OnlineClassShedule";
import PaymentHistory from "./Components/Teacher/PaymentHistory";
import TeacherNotification from "./Components/Teacher/TeacherNotification";
import ForgotPassword from "./Components/Student/ForgotPassword";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./Components/Admin/ResetPassword";
import UpdatePassword from "./Components/Student/UpdatePassword";
import StudentNotification from "./Components/Student/StudentNotification";
import StudentAttendance from "./Components/Admin/StudentAttendance";
import TeacherAttendance from "./Components/Admin/TeacherAttendance";
import Syllabus from "./Components/Teacher/Syllabus";
import TeacherAssignment from "./Components/Teacher/TeacherAssignment";
import GoogleMeetPage from "./Components/google/MeetForm.js";

import "react-toastify/dist/ReactToastify.css";

// Import Redux Provider and Store
import { Provider } from "react-redux";
import store from "./redux/Store/store";
import AddTeacher from "./Components/Teacher/AddTeacher";
import TeacherDashboard from "./Components/Teacher/TeacherDashboard";
import AdminAttendance from "./Components/Admin/AdminAttendance";
import Quiz from "./Components/Admin/Quiz";
import Test from "./Components/Student/Test";
import StudentCertificate from "./Components/Student/StudentCertificate";
import StudentOnlineClass from "./Components/Student/StudentOnlineClass";
import AssignClass from "./Components/Teacher/AssignClass";
import CompletedClass from "./Components/Teacher/CompletedClass";
import StudentSettings from "./Components/Student/StudentSettings";
import Announcements from "./Components/Teacher/Announcements";
import TeacherSettings from "./Components/Teacher/TeacherSettings";
import AbacusMath from "./Components/Admin/Abacus";
import StudentData from "./Components/Teacher/StudentData";
import AbacusKit from "./Components/Admin/Kit";
import AbacusSidePanel from "./Components/Admin/AbacusSidePannel";
import ApprovalLeave from "./Components/Teacher/ApprovalLeave";
import Topics from "./Components/Teacher/Topics";
import CompletedTest from "./Components/Student/completedtest";
import CreateMeeting from "./Components/Teacher/Meeting";
import AssignStudent from "./Components/Admin/AssignStudent.js";
import Pending from "./Components/Admin/Pending.js";


// ProtectedRoute component to check login status
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
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
          <Route path="/teacherFirstLogin" element={<TeacherFirstLogin />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/registerStudent" element={<RegisterStudent />} />
          <Route path="/adminAttendance" element={<AdminAttendance />} />
          <Route path="/teacherAttendance" element={<TeacherAttendance />} />
          <Route path="/studentAttendance" element={<StudentAttendance />} />
          <Route path="/studentdata" element={<StudentData/>}/>
          <Route path="/ScheduleForm" element={<ScheduleForm/>}/>
          <Route path="/RegisteredStudents" element={<RegisteredStudents/>}/>
          <Route path="/AddQuestion" element={<AddQuestion/>}/>
          <Route path="/ImportQuestion" element={<ImportQuestion/>}/>
          <Route path="/AssignedClass" element={<AssignedClass/>}/>
          <Route path="/CompleteClass" element={<CompleteClass/>}/>
          <Route path="/Createmeeting" element={<Createmeeting/>}/>
          <Route path="/meet" element={<GoogleMeetPage/>}/>
          <Route path="/meeting" element={<CreateMeeting/>}/>
          <Route path="/pending" element={<Pending/>}/>
          <Route path="/assigned-class" element={<Assigned_class/>}/>
          <Route path="/completed_class" element={<Completed_class/>}/>
          <Route path="/FeesPayment" element={<FeesPayment/>}/>

          {/* Protected Routes */}
          <Route
            path="/adminDashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/studentList"
            element={<ProtectedRoute element={<StudentList />} />}
          />
          <Route
            path="/listTeacher"
            element={<ProtectedRoute element={<ListTeacher />} />}
          />
          <Route
            path="/assignment"
            element={<ProtectedRoute element={<TeacherAssignment />} />}
          />
          <Route
            path="/approvedleave"
            element={<ProtectedRoute element={<ApprovalLeave />} />}
          />
          <Route
            path="/quiztest"
            element={<ProtectedRoute element={<QuizPage />} />}
          />
          <Route
            path="/completedclass"
            element={<ProtectedRoute element={<CompletedClass />} />}
          />
          <Route
            path="/assignclass"
            element={<ProtectedRoute element={<AssignClass />} />}
          />
          <Route
            path="/onlineClass"
            element={<ProtectedRoute element={<OnlineClass />} />}
          />
          <Route
            path="/StudentHeader"
            element={<ProtectedRoute element={<StudentHeader />} />}
          />
          <Route
            path="/teachernotification"
            element={<ProtectedRoute element={<TeacherNotification />} />}
          />
          <Route
            path="/syllabus"
            element={<ProtectedRoute element={<Syllabus />} />}
          />
          <Route
            path="/topics"
            element={<ProtectedRoute element={<Topics />} />}
          />
          <Route
            path="/StudentDashboard"
            element={<ProtectedRoute element={<StudentDashboard />} />}
          />
          <Route
            path="/addTeacher"
            element={<ProtectedRoute element={<AddTeacher />} />}
          />
          <Route
            path="/abacus"
            element={<ProtectedRoute element={<Abacus />} />}
          />
          <Route
            path="/studentnotification"
            element={<ProtectedRoute element={<StudentNotification />} />}
          />
          <Route
            path="/notification"
            element={<ProtectedRoute element={<NotificationPage />} />}
          />
          <Route
            path="/enrollmentRequest"
            element={<ProtectedRoute element={<EnrollmentRequestList />} />}
          />
          <Route
            path="/teacherEnrollment"
            element={<ProtectedRoute element={<TeacherEnrollment />} />}
          />
          <Route
            path="/adminSettings"
            element={<ProtectedRoute element={<AdminSettings />} />}
          />
          <Route
            path="/teacherDashboard"
            element={<ProtectedRoute element={<TeacherDashboard />} />}
          />
          <Route
            path="/questionListPage"
            element={<ProtectedRoute element={<QuestionListPage />} />}
          />
          <Route
            path="/myStudents"
            element={<ProtectedRoute element={<Students />} />}
          />
          <Route
            path="/attendance"
            element={<ProtectedRoute element={<StudentAttendanceList />} />}
          />
          <Route
            path="/attendanceData"
            element={<ProtectedRoute element={<AttendanceDataPage />} />}
          />
          <Route
            path="/paymentHistory"
            element={<ProtectedRoute element={<PaymentHistory />} />}
          />
          <Route
            path="/onlineClassShedule"
            element={<ProtectedRoute element={<OnlineClassShedule />} />}
          />
          <Route path="/quiz" element={<ProtectedRoute element={<Quiz />} />} />
          <Route path="/test" element={<ProtectedRoute element={<Test />} />} />
          <Route
            path="/studentcertificate"
            element={<ProtectedRoute element={<StudentCertificate />} />}
          />
          <Route
            path="/studentOnlineClass"
            element={<ProtectedRoute element={<StudentOnlineClass />} />}
          />
          <Route
            path="/assignstudent"
            element={<ProtectedRoute element={<AssignStudent />} />}
          />

         
          <Route
            path="/studentSettings"
            element={<ProtectedRoute element={<StudentSettings />} />}
          />
          <Route
            path="/Announcements"
            element={<ProtectedRoute element={<Announcements />} />}
          />
          <Route
            path="/teacherSettings"
            element={<ProtectedRoute element={<TeacherSettings />} />}
          />
          <Route
            path="/AbacusMath"
            element={<ProtectedRoute element={<AbacusMath />} />}
          />
          <Route
            path="/AbacusSidePanel"
            element={<ProtectedRoute element={<AbacusSidePanel />} />}
          />
          {/* <Route path="/EditTeacher" element={<ProtectedRoute element={<EditTeacher />} />} /> */}
          <Route
            path="/AbacusKit"
            element={<ProtectedRoute element={<AbacusKit />} />}
          />
          <Route
            path="/completedtest"
            element={<ProtectedRoute element={<CompletedTest />} />}
          />
           {/* <Route
            path="/meeting"
            element={<ProtectedRoute element={<CreateMeeting />} />}
          /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;