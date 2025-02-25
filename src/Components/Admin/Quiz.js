import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import './Question.css';

const Quiz = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(true); // Show sidebar by default on desktop
      } else {
        setSidebarVisible(false); // Hide sidebar by default on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to adjust initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            <Row className="justify-content-center">
              <Col xs={12} md={8} className="text-center">
                <h1>Welcome to the Quiz Panel</h1>
                <p>Here you can manage your quizzes and questions.</p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Quiz;