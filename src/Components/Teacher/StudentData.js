import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';


const StudentData = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);


  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
        <h4>OnProgress...</h4>
      </Container>
      </div>
      </div>
  );
};

export default StudentData;
