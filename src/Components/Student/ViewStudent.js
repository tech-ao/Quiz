import React from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const ViewStudentPanel = ({ show, onClose }) => {

  const { selectedStudent } = useSelector((state) => state.students);
 const studentData = selectedStudent && selectedStudent.user
  
  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>View Student Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="mb-3">
          <Col>
            <strong>First Name:</strong>
            <p>{studentData?.firstName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Last Name:</strong>
            <p>{studentData?.lastName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Email:</strong>
            <p>{studentData?.email || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Phone Number:</strong>
            <p>
              {studentData?.countryCode || ""} {studentData?.phoneNumber || "N/A"}
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Date of Birth:</strong>
            <p>{studentData?.dob || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Grade:</strong>
            <p>{studentData?.Grade || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Address:</strong>
            <p>{studentData?.address || "N/A"}</p>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
         
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ViewStudentPanel;
