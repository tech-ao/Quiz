import React, { useState, useEffect } from "react";
import axios from "axios";
import { Offcanvas, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewStudentPanel = ({ show, onClose }) => {
  const { selectedStudent } = useSelector((state) => state.students);
  const studentData = selectedStudent && selectedStudent.data;

  // State to hold the profile image
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format date of birth if available
  const formatDate = (dob) => {
    return dob ? new Date(dob).toLocaleDateString() : "N/A";
  };

  // Fetch profile image on component mount or when studentData changes
  useEffect(() => {
    if (studentData?.userId) {
      axios
        .get(`http://localhost:8012/api/Profile/GetContentByUserId?userId=${studentData.userId}`, {
          responseType: "arraybuffer", 
          headers: {
            "accept": "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280", // Replace with your actual API key
            "AccessToken": "123" // Replace with the actual access token
          }
        })
        .then((response) => {
          const imageBlob = new Blob([response.data], { type: "image/jpeg" });
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfileImage(imageUrl);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load profile image");
          setLoading(false);
        });
    }
  }, [studentData?.userId]);

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" >
      <Offcanvas.Header closeButton className="modalbg"> 
        <Offcanvas.Title>View Student Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="modalbg">
        {/* Profile Image Section */}
        <Row className="mb-3">
          <Col className="text-center">
            <strong>Profile Image:</strong>
            {loading ? (
              <p>Loading image...</p>
            ) : error ? (
              <p>{error}</p>
            ) : profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                roundedCircle
                width="150"
                height="150"
                fluid
              />
            ) : (
              <p>No image available</p>
            )}
          </Col>
        </Row>

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
            <p>{formatDate(studentData?.dob)}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Gender:</strong>
            <p>{studentData?.genderName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Register Number:</strong>
            <p>{studentData?.registerNumber || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Grade:</strong>
            <p>{studentData?.gradeName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Status:</strong>
            <p>{studentData?.statusName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Address:</strong>
            <p>{studentData?.address || "N/A"}</p>
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ViewStudentPanel;
