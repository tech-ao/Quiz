import React, { useState } from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://santhwanamhhcs.in:8081/api";

const ViewTeacher = ({ show, onClose, teacherData }) => {
  console.log("this is from view teachers", teacherData);
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
        {/* Personal Information */}
        <Row className="mb-3">
          <Col>
            <strong>Full Name:</strong>
            <p>{teacherData?.fullName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Date of Birth:</strong>
            <p>{formatDate(teacherData?.dob)}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Gender:</strong>
            <p>{teacherData?.gender || teacherData?.genderName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Register Number:</strong>
            <p>{teacherData?.teacherRegno || teacherData?.registerNo || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Phone Number:</strong>
            <p>
              {teacherData?.countryCode ? teacherData.countryCode + " " : ""}
              {teacherData?.phoneNumber || "N/A"}
            </p>
          </Col>
          <Col>
            <strong>Email:</strong>
            <p>{teacherData?.email || "N/A"}</p>
          </Col>
        </Row>

        {/* Account Information */}
        <Row className="mb-3">
          <Col>
            <strong>Is First Login:</strong>
            <p>{teacherData?.isFirstLogin ? "Yes" : "No"}</p>
          </Col>
          <Col>
            <strong>Is Agree:</strong>
            <p>{teacherData?.isAgree ? "Yes" : "No"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Status ID:</strong>
            <p>{teacherData?.statusId || "N/A"}</p>
          </Col>
          <Col>
            <strong>Status Name:</strong>
            <p>{teacherData?.statusName || "N/A"}</p>
          </Col>
        </Row>

        {/* Address Information */}
        <Row className="mb-3">
          <Col>
            <strong>Permanent Address:</strong>
            <p>{teacherData?.permanentAddress || "N/A"}</p>
          </Col>
          <Col>
            <strong>Current Residential Address:</strong>
            <p>{teacherData?.currentResidentialAddress || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Same As Permanent Address:</strong>
            <p>{teacherData?.sameAsPermanentAddress ? "Yes" : "No"}</p>
          </Col>
        </Row>

        {/* Availability & Work Details */}
        <Row className="mb-3">
          <Col>
            <strong>Availability ID:</strong>
            <p>{teacherData?.availabilityId || "N/A"}</p>
          </Col>
          <Col>
            <strong>Availability:</strong>
            <p>{teacherData?.availability || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Teacher Mode ID:</strong>
            <p>{teacherData?.teacherModeId || "N/A"}</p>
          </Col>
          <Col>
            <strong>Teaching Mode:</strong>
            <p>{teacherData?.teachingModeName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Preferred Work Schedule ID:</strong>
            <p>{teacherData?.preferedWorkScheduledId || "N/A"}</p>
          </Col>
          <Col>
            <strong>Work Schedule:</strong>
            <p>{teacherData?.workSchedule || "N/A"}</p>
          </Col>
        </Row>

        {/* Additional Information */}
        <Row className="mb-3">
          <Col>
            <strong>Disclaimer Content:</strong>
            <p>{teacherData?.disclaimerContent || "N/A"}</p>
          </Col>
          <Col>
            <strong>Created By:</strong>
            <p>{teacherData?.createdBy || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Nationality ID:</strong>
            <p>{teacherData?.nationalityId || "N/A"}</p>
          </Col>
          <Col>
            <strong>Preferred Country ID:</strong>
            <p>{teacherData?.preferedCountryId || "N/A"}</p>
          </Col>
        </Row>

        {/* Document & Media */}
        <Row className="mb-3">
          <Col>
            <strong>Candidate Photo:</strong>
            {teacherData?.candidatePhoto ? (
              <img
                src={teacherData.candidatePhoto}
                alt="Candidate"
                style={{ width: "100px", height: "auto" }}
              />
            ) : (
              <p>N/A</p>
            )}
          </Col>
          <Col>
            <strong>Photo ID:</strong>
            {teacherData?.photoID ? (
              <img
                src={teacherData.photoID}
                alt="Photo ID"
                style={{ width: "100px", height: "auto" }}
              />
            ) : (
              <p>N/A</p>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Graduation Photo:</strong>
            {teacherData?.graduationPhoto ? (
              <img
                src={teacherData.graduationPhoto}
                alt="Graduation"
                style={{ width: "100px", height: "auto" }}
              />
            ) : (
              <p>N/A</p>
            )}
          </Col>
          <Col>
            <strong>Experience Proof:</strong>
            {teacherData?.experienceProof ? (
              <img
                src={teacherData.experienceProof}
                alt="Experience Proof"
                style={{ width: "100px", height: "auto" }}
              />
            ) : (
              <p>N/A</p>
            )}
          </Col>
        </Row>

        {/* Education & Professional Details */}
        <Row className="mb-3">
          <Col>
            <strong>Highest Level Education:</strong>
            <p>{teacherData?.higherLevelEducation || "N/A"}</p>
          </Col>
          <Col>
            <strong>Institute Attended:</strong>
            <p>{teacherData?.institute || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Degrees/Certifications:</strong>
            <p>{teacherData?.degrees || "N/A"}</p>
          </Col>
          <Col>
            <strong>Subject Specialist:</strong>
            <p>{teacherData?.subjectSpecialist || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Year of Graduation:</strong>
            <p>{teacherData?.yearOfGraduation || "N/A"}</p>
          </Col>
          <Col>
            <strong>Employer Name:</strong>
            <p>{teacherData?.employerName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Job Title:</strong>
            <p>{teacherData?.jobTitle || "N/A"}</p>
          </Col>
          <Col>
            <strong>Years of Experience:</strong>
            <p>{teacherData?.yoe || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Preferred Countries:</strong>
            <p>{teacherData?.preferredCountries || "N/A"}</p>
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
