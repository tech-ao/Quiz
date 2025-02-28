import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Spinner, Alert, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';
import './TeacherSetting.css';
import profilePic from '../images/dummmy_profile.jpg'; // Replace with actual path
import { getStudent } from '../../redux/Services/api';

const TeacherSettings = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);
      try {
        const adminResponse = await getStudent(1); // Adjust ID as needed
        setAdminData(adminResponse.data);
      } catch (error) {
        setError("Failed to load teacher data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  // Section edit handler
  const handleEdit = (section) => {
    console.log(`Editing section: ${section}`);
    // Implement your edit logic here
  };

  // Section title with edit button component
  const SectionTitle = ({ title, section }) => (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h5 className="fw-bold text-secondary mb-0">{title}</h5>
      <Button 
        variant="link" 
        className="p-0 text-primary" 
        onClick={() => handleEdit(section)}
        aria-label={`Edit ${section}`}
      >
        <FaEdit size={18} />
      </Button>
    </div>
  );

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container" style={{ width: "94%" }}>
            <Row className="mb-4">
              <Col md={8} style={{ marginTop: "25px" }}>
                <h2 className="fw-bold">Teacher Profile</h2>
              </Col>
            </Row>

            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Card className="p-4 shadow-lg profile-card">
                {/* Desktop Layout */}
                <div className="d-none d-md-block">
                  <Row>
                    {/* Left Column - Profile Picture & Name */}
                    <Col md={4} className="d-flex flex-column align-items-center">
                      <div className="position-relative">
                        <Image
                          src={profilePic}
                          roundedCircle
                          className="profile-pic mb-3"
                          alt="Profile"
                        />
                        <Button 
                          variant="link" 
                          className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1"
                          onClick={() => handleEdit('profile-picture')}
                          aria-label="Edit profile picture"
                        >
                          <FaEdit size={16} className="text-primary" />
                        </Button>
                      </div>
                      <h4 className="text-success fw-bold mb-2">
                        {adminData?.name || "Andrews"}
                      </h4>
                      <hr className="w-50" />
                    </Col>

                    {/* Right Column - Contact Info */}
                    <Col md={8} className="d-flex flex-column">
                      <SectionTitle title="Contact Information" section="contact" />
                      <p>Email: <span className="text-primary">{"andrews.tech@gmail.com"}</span></p>
                      <p>Phone: <span className="text-primary">{"61+ 6065 6528"}</span></p>
                      <p>Address: <span className="text-primary">{"21b-Square Area, Belgium"}</span></p>
                      <p>Gender: <span className="text-primary">{"Male"}</span></p>
                      <p>Qualification: <span className="text-primary">{"Master Degree in Mathematical"}</span></p>
                    </Col>
                  </Row>

                  {/* Additional Info Below Profile */}
                  <Row className="mt-4">
                    {/* Left Column - Staff Details */}
                    <Col md={4} className="d-flex flex-column staff-info">
                      <SectionTitle title="Staff Information" section="staff" />
                      <p>Staff ID: <span className="text-primary">{adminData?.staffId || "N/A"}</span></p>
                      <p>Role: <span className="text-primary">{adminData?.role || "N/A"}</span></p>
                      <p>Designation: <span className="text-primary">{adminData?.designation || "N/A"}</span></p>
                      <p>Date of Joining: <span className="text-primary">{adminData?.joiningDate || "N/A"}</span></p>
                    </Col>
                  
                    {/* Right Column - Salary Details */}
                    <Col md={8} className="d-flex flex-column">
                      <hr className="mb-3"/>
                      <SectionTitle title="Contract & Salary" section="salary" />
                      <p>Basic Salary: <span className="text-primary">${adminData?.salary || "N/A"}</span></p>
                      <p>Contract Type: <span className="text-primary">{adminData?.contractType || "N/A"}</span></p>
                      <p>Work Location: <span className="text-primary">{adminData?.location || "N/A"}</span></p>
                    </Col>
                  </Row>
                </div>

                {/* Mobile Layout */}
                <div className="d-md-none">
                  {/* Profile Picture & Name */}
                  <div className="d-flex flex-column align-items-center mb-4">
                    <div className="position-relative">
                      <Image
                        src={profilePic}
                        roundedCircle
                        className="profile-pic mb-3"
                        alt="Profile"
                        style={{ width: "150px", height: "150px" }}
                      />
                      <Button 
                        variant="link" 
                        className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1"
                        onClick={() => handleEdit('profile-picture')}
                        aria-label="Edit profile picture"
                      >
                        <FaEdit size={16} className="text-primary" />
                      </Button>
                    </div>
                    <h4 className="text-success fw-bold mb-2">
                      {adminData?.name || "Andrews"}
                    </h4>
                    <hr className="w-50 mb-4" />
                  </div>

                  {/* Staff Information */}
                  <div className="mb-4">
                    <SectionTitle title="Staff Information" section="staff" />
                    <p>Staff ID: <span className="text-primary">{adminData?.staffId || "N/A"}</span></p>
                    <p>Role: <span className="text-primary">{adminData?.role || "N/A"}</span></p>
                    <p>Designation: <span className="text-primary">{adminData?.designation || "N/A"}</span></p>
                    <p>Date of Joining: <span className="text-primary">{adminData?.joiningDate || "N/A"}</span></p>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-4">
                    <SectionTitle title="Contact Information" section="contact" />
                    <p>Email: <span className="text-primary">{"andrews.tech@gmail.com"}</span></p>
                    <p>Phone: <span className="text-primary">{"61+ 6065 6528"}</span></p>
                    <p>Address: <span className="text-primary">{"21b-Square Area, Belgium"}</span></p>
                    <p>Gender: <span className="text-primary">{"Male"}</span></p>
                    <p>Qualification: <span className="text-primary">{"Master Degree in Mathematical"}</span></p>
                  </div>

                  {/* Contract & Salary */}
                  <div>
                    <hr className="mb-3"/>
                    <SectionTitle title="Contract & Salary" section="salary" />
                    <p>Basic Salary: <span className="text-primary">${adminData?.salary || "N/A"}</span></p>
                    <p>Contract Type: <span className="text-primary">{adminData?.contractType || "N/A"}</span></p>
                    <p>Work Location: <span className="text-primary">{adminData?.location || "N/A"}</span></p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherSettings;