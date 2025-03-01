import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://santhwanamhhcs.in:8081/api";

const ViewTeacher = ({ show, onClose, teacherData }) => {
  console.log("this is from view teaches",teacherData)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format date of birth if available
  const formatDate = (dob) => {
    return dob ? new Date(dob).toLocaleDateString() : "N/A";
  };

  // Update status for the teacher (1: Approved, 2: Rejected)
  const updateStatus = async (statusEnum) => {
    try {
      if (!teacherData || !teacherData.teacherId) {
        toast.error("No teacher data available.");
        return;
      }
      const requestBody = {
        statusEnum,
        teacherIdList: [teacherData.teacherId],
      };

      await axios.post(`${BASE_URL}/Teacher/UpdateTeacherStatus`, requestBody, {
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
        <Offcanvas.Title>View Teacher Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="mb-3">
          <Col>
            <strong>Full Name:</strong>
            <p>{teacherData?.fullName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Email:</strong>
            <p>{teacherData?.email || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Phone Number:</strong>
            <p>
              {teacherData?.countryCode || ""} {teacherData?.phoneNumber || "N/A"}
            </p>
          </Col>
          <Col>
            <strong>Date of Birth:</strong>
            <p>{formatDate(teacherData?.dob) || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Gender:</strong>
            <p>{teacherData?.genderName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Register Number:</strong>
            <p>{teacherData?.teacherRegno || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Status:</strong>
            <p>{teacherData?.statusName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Teaching Mode:</strong>
            <p>{teacherData?.teachingModeName || "N/A"}</p>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3">
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