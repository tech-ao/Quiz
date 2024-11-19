import React from 'react';
import StudentList from '../State/Student';
import Sidebar from './SidePannel';

function StudentLists() {
  return (
    <div className="d-flex">
      <Sidebar /> 
      <StudentList />
    </div>
  );
}

export default StudentLists;



