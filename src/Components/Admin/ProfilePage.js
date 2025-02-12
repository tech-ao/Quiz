import React from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import profilePic from '../images/dummmy_profile.jpg'; // Replace with actual profile image path
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-lg profile-card">
        <Row>
          {/* Left Column - Profile Info */}
          <Col md={6} className="d-flex flex-column align-items-center">
            <Image
              src={profilePic}
              roundedCircle
              className="profile-pic mb-3"
              alt="Profile"
            />
            <h4 className="text-success fw-bold">John Doe</h4>
            <hr className="w-50" />
          </Col>

          {/* Right Column - Contact & Bank Info */}
          <Col md={6} className="d-flex flex-column">
            <h5 className="fw-bold text-secondary">Contact Information</h5>
            <p>Email: <span className="text-primary">john.doe@example.com</span></p>
            <p>Phone: <span className="text-primary">+123 456 7890</span></p>
            <p>Address: <span className="text-primary">123 Main St, City, Country</span></p>
            <p>Emergency Contact: <span className="text-primary">+987 654 3210</span></p>
            <p>Date of Birth: <span className="text-primary">Feb 20, 1985</span></p>
            <p>Gender: <span className="text-primary">Male</span></p>
            <p>Marital Status: <span className="text-primary">Married</span></p>
            <p>Qualification: <span className="text-primary">Master's in Computer Science</span></p>
            <p>PAN Number: <span className="text-primary">ABCDE1234F</span></p>

            <hr />

            <h5 className="fw-bold text-secondary">Bank Details</h5>
            <p>Bank Name: <span className="text-primary">ABC Bank</span></p>
            <p>Account No: <span className="text-primary">**** 5678</span></p>
            <p>IFSC Code: <span className="text-primary">ABCD0123456</span></p>
          </Col>
        </Row>

        {/* Additional Info Below Profile */}
        <Row className="mt-4">
          {/* Left Column - Staff Info */}
          <Col md={6} className="d-flex flex-column">
            <h5 className="fw-bold text-secondary">Staff Information</h5>
            <p>Staff ID: <span className="text-primary">ST12345</span></p>
            <p>Role: <span className="text-primary">Administrator</span></p>
            <p>Designation: <span className="text-primary">Senior Admin</span></p>
            <p>Date of Joining: <span className="text-primary">Jan 15, 2022</span></p> {/* Moved here */}
          </Col>

          {/* Right Column - Contract & Salary */}
          <Col md={6} className="d-flex flex-column">
            <h5 className="fw-bold text-secondary">Contract & Salary</h5>
            <p>Basic Salary: <span className="text-primary">$60,000</span></p>
            <p>Contract Type: <span className="text-primary">Full-time</span></p>
            <p>Work Location: <span className="text-primary">New York, USA</span></p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;