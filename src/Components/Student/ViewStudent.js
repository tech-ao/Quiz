import React, { useState, useEffect } from "react";
import axios from "axios";
import { Offcanvas, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import BASE_URL from "../../redux/Services/Config";

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
        .get(`${BASE_URL}/Profile/GetContentByUserId?userId=${studentData.userId}`, {
          headers: {
            "accept": "text/plain", // Assuming the response is base64-encoded string
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280", // Replace with your actual API key
            "AccessToken": "123" // Replace with the actual access token
          }
        })
        .then((response) => {
          const base64Image = response.data; // Assuming the API returns a base64 string
          setProfileImage(base64Image.data);
          console.log(base64Image.data);
          
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load profile image");
          setLoading(false);
        });
    }
  }, [studentData?.userId]);

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton className="modalbg">
        <Offcanvas.Title>View Student Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="modalbg">
        {/* Profile Image Section */}
        <Row className="mb-3">
          <Col className="text-center">
           
          <div
                    style={{
                      border: "5px solid #4caf50",
                      borderRadius: "50%",
                      padding: "5px",
                      display: "inline-block",
                      height:'171px'
                    }}
                  >
            {loading ? (
              <p>Loading image...</p>
            ) : error ? (
              <p>{error}</p>
            ) : profileImage ? (
              <Image
                src={`data:image/jpeg;base64,${profileImage}`} // Displaying base64 image
                alt="Profile"
                roundedCircle
                width="150"
                height="150px" 
                
              />
            ) : (
              <p>No image available</p>
            )}
            </div>
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
