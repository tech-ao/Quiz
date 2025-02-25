import React from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://santhwanamhhcs.in:8081/api";

const ViewTeacher = ({ show, onClose, studentData }) => {
  const updateStatus = async (statusEnum) => {
    try {
      if (!studentData || !studentData.studentId) {
        toast.error("No student data available.");
        return;
      }
      const requestBody = {
        statusEnum,
        studentIdList: [studentData.studentId],
      };

      await axios.post(`${BASE_URL}/Student/UpdateStudentStatus`, requestBody, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
        },
      });
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleApprove = () => {
    updateStatus(1);
  };

  const handleDeny = () => {
    updateStatus(2);
  };

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
            <p>{studentData?.grade || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Address:</strong>
            <p>{studentData?.address || "N/A"}</p>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="success" onClick={handleApprove} className="me-2">
            Approve
          </Button>
          <Button variant="danger" onClick={handleDeny}>
            Reject
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ViewTeacher;
