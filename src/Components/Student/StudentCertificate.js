import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./StudnetSidebar";
import AdminHeader from "./StudentHeader";

const StudentCertificate = () => {
  const studentName = "John Doe";
  const courseName = "React Development";
  const dateIssued = new Date().toLocaleDateString();

  return (
    <div>
      <AdminHeader />
      <div className="d-flex">
        <Sidebar />
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container text-center">
            <h1>Certificate of Completion</h1>
            <h2>This certifies that</h2>
            <h3>{studentName}</h3>
            <p>has successfully completed the course</p>
            <h4>{courseName}</h4>
            <p>Issued on: {dateIssued}</p>
            <Button variant="success" onClick={() => alert("Certificate Downloaded!")}>
              Download Certificate
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentCertificate;
