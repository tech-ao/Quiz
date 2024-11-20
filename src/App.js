import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard';
import Login from './Components/Login'
import StudentAPI from './State/StudentApi';
import AdminLoginPage from './Components/AdminLogin';
function App() {
  return (
      <Router>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/adminDashboard' element={<AdminDashboard />} />
              <Route path='/studentList' element={<StudentAPI />} />  
              <Route path ='/adminLogin' element={<AdminLoginPage/>}/>
                  
          </Routes>
      </Router>
  );
}
export default App;
