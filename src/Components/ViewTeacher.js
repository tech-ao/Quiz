import React, { useState } from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../redux/Services/Config";
import { toast } from "react-toastify";

const ViewTeacher = ({ show, onClose, teacherData }) => {
  console.log("this is from view teachers", teacherData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); 

  const formatDate = (dob) => {
    return dob ? new Date(dob).toLocaleDateString() : "N/A";
  };

  
  const sampleBase64PDF = `
JVBERi0xLjQKJeLjz9MNCjEgMCBvYmo8PC9UeXBlL1BhZ2UvUGFyZW50
IDUgMCBSL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERi9UZXh0XS9YT2Jq
ZWN0PDwvRjE8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMQovQmFzZUZv
bnQvSGVsdmV0aWNhL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZz4+Pj4+
Pj4KZW5kb2JqCjUgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHMgWzEgMCBS
Xj4+CmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAw
MDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDAwMiAwMDAwMCBuIAowMDAw
MDAwMDAzIDAwMDAwIG4gCjAwMDAwMDAwMDQgMDAwMDAgbiAKMDAwMDAw
MDAwNSA2NTUzNSBmIAp0cmFpbGVyCjw8L1NpemUgNi9Sb290IDUgMCBS
L0luZm8gNiAwIFI+PgpzdGFydHhyZWYKNDY0CiUlRU9GCg==
`;

  const updateStatus = async (statusEnum) => {
    try {
      setIsUpdating(true);
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
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
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
        <h5>Personal Information</h5>
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
            <p>{teacherData?.genderName || "N/A"}</p>
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
        <Row className="mb-3">
        <Col>
            <strong>Nationality:</strong>
            <p>{teacherData?.nationalityName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Candidate Photo:</strong>
            {teacherData?.teacherDocumentFileModels?.length > 0 ? (
              teacherData.teacherDocumentFileModels.map((file) =>
                file.documentTypeId === 8 ? (
                  <div key={file.teacherDocumentFileId}>
                    <p>{file.name}</p>
                  </div>
                ) : null
              )
            ) : (
              <p>N/A</p>
            )}
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

        <h5>Education Qualification</h5>
        <Row className="mb-3">
          <Col>
            <strong>Highest Level Education:</strong>
            <p>{teacherData?.educationQualificationModel?.higherLevelEducation || "N/A"}</p>
          </Col>
          <Col>
            <strong>Institute Attended:</strong>
            <p>{teacherData?.educationQualificationModel?.institute || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Degrees/Certifications:</strong>
            <p>{teacherData?.degrees || "N/A"}</p>
          </Col>
          <Col>
            <strong>Subject Specialist:</strong>
            <p>{teacherData?.educationQualificationModel?.subjectSpecialist || "N/A"}</p>
          </Col>
        </Row>

        <h5>Professional Experience</h5>
        <Row className="mb-3">
          <Col>
            <strong>Year of Graduation:</strong>
            <p>{teacherData?.educationQualificationModel?.yearOfGraduation || "N/A"}</p>
          </Col>
          <Col>
            <strong>Employer Name:</strong>
            <p>{teacherData?.professionalExperianceModel?.employerName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Job Title:</strong>
            <p>{teacherData?.professionalExperianceModel?.jobTitle || "N/A"}</p>
          </Col>
          <Col>
            <strong>Years of Experience:</strong>
            <p>{teacherData?.professionalExperianceModel?.yoe || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Preferred Countries:</strong>
            <p>{teacherData?.preferedCountryName || "N/A"}</p>
          </Col>
        </Row>

        {/* Availability & Work Details */}
        <Row className="mb-3">
          <Col>
            <strong>Availability:</strong>
            <p>{teacherData?.availabilityName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Teaching Mode:</strong>
            <p>{teacherData?.teacherModeName || "N/A"}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <strong>Work Schedule:</strong>
            <p>{teacherData?.preferedWorkScheduledName || "N/A"}</p>
          </Col>
        </Row>

        {/* Document & Media */}
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
            <strong>Resume:</strong>
            {teacherData?.teacherDocumentFileModels?.length > 0 ? (
              teacherData.teacherDocumentFileModels.map((file) =>
                file.documentTypeId === 4 ? (
                  <div key={file.teacherDocumentFileId}>
                    <p>{file.name}</p>
                  </div>
                ) : null
              )
            ) : (
              <p>N/A</p>
            )}
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-3">
          <Button variant="success" onClick={handleApprove} className="me-2" disabled={isUpdating}>
            Approve
          </Button>
          <Button variant="danger" onClick={handleDeny} disabled={isUpdating}>
            Reject
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ViewTeacher;