import React, { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';


const StudentData = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
      };
    
      // Handle window resize for sidebar visibility
      useEffect(() => {
        const handleResize = () => {
          setIsSidebarVisible(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
      

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
