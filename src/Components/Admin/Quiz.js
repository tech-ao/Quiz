import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import './Question.css';

const Quiz = () => {
  return (
    <div>
      <AdminHeader />
      <div className="d-flex">
        <Sidebar />
        <Container className="main-container p-4 min-vh-100">
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
