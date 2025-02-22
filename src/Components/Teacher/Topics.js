import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";

const Topics=()=>{
    const [isSidebarVisible, setIsSidebarVisible] = useState(
            window.innerWidth >= 768
          );
        
          const toggleSidebar = () => {
            setIsSidebarVisible((prev) => !prev);
          };
        
          useEffect(() => {
            const handleResize = () => {
              setIsSidebarVisible(window.innerWidth >= 768);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
          }, []);

          return(
            <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
    <Container className="main-container p-4 min-vh-100">
            <h4>On Progress</h4>
    </Container>
    </div>
    </div>
          )
}
export default Topics;