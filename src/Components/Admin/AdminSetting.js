import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import profilePic from "../images/dummmy_profile.jpg"; // Replace with actual profile image path
import "./AdminSettings.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader"; // Assuming this contains the header with the toggle button
import { FaEdit } from "react-icons/fa";


const AdminSetting = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    staffId: "ST12345",
    role: "Administrator",
    designation: "Senior Admin",
    joiningDate: "Jan 15, 2022",
    salary: "$60,000",
    contractType: "Full-time",
    location: "New York, USA",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    address: "123 Main St, City, Country",
    emergencyContact: "+987 654 3210",
    dob: "Feb 20, 1985",
    gender: "Male",
    maritalStatus: "Married",
    qualification: "Master's in Computer Science",
    panNumber: "ABCDE1234F",
    bankName: "ABC Bank",
    accountNo: "**** 5678",
    ifscCode: "ABCD0123456",
  });

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
    setEditMode(false); // Disable edit mode after saving
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true); // Show sidebar by default on desktop
      } else {
        setIsSidebarVisible(false); // Hide sidebar by default on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to adjust initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container" style={{ overflowY:"hidden"}}>
  {/* Sticky Title */}
  <div
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1000,
              padding: "20px 0",
              height: "80px"
            }}
          >
            <h2 style={{ margin: 0 }}>Admin Details</h2>
          </div>

          <div className="sub-container">
            <div className="flex-grow-1">
              <Card className="p-4 shadow-lg profile-card">
                <Row className="profile-row">
                  {/* Left Column */}
                  <Col
                    xs={12}
                    md={6}
                    className="d-flex flex-column align-items-start" style={{paddingLeft:'10%'}}
                  >
                    {/* Profile Picture */}
                    <Image
                      src={profilePic}
                      roundedCircle
                      className="profile-pic mb-3"
                      alt="Profile" style={{width:'120px',marginLeft:"30%"}}
                    />

                    {/* Name */}
                    {editMode ? (
                      <Form.Control
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="mb-3 form-control"
                      />
                    ) : (
                      <h4 className="text-success fw-bold " style={{marginLeft:"30%"}}>
                        {profileData.name}
                      </h4>
                    )}
                    <hr className="w-50" />

                    {/* Staff Information */}
                    <h5 className="fw-bold text-secondary">
                      Staff Information
                    </h5>
                    <p>
                      Staff ID:{" "}
                      <span className="text-primary">
                        {profileData.staffId}
                      </span>
                    </p>

                    {editMode ? (
                      <>
                        <Form.Control
                          type="text"
                          name="role"
                          value={profileData.role}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="designation"
                          value={profileData.designation}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="joiningDate"
                          value={profileData.joiningDate}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                      </>
                    ) : (
                      <>
                        <p>
                          Role:{" "}
                          <span className="text-primary">
                            {profileData.role}
                          </span>
                        </p>
                        <p>
                          Designation:{" "}
                          <span className="text-primary">
                            {profileData.designation}
                          </span>
                        </p>
                        <p>
                          Date of Joining:{" "}
                          <span className="text-primary">
                            {profileData.joiningDate}
                          </span>
                        </p>
                      </>
                    )}

                    {/* Contract & Salary */}
                    <h5 className="fw-bold text-secondary mt-4">
                      Contract & Salary
                    </h5>
                    <p>
                      Basic Salary:{" "}
                      <span className="text-primary">{profileData.salary}</span>
                    </p>
                    {editMode ? (
                      <>
                        <Form.Control
                          type="text"
                          name="contractType"
                          value={profileData.contractType}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                      </>
                    ) : (
                      <>
                        <p>
                          Contract Type:{" "}
                          <span className="text-primary">
                            {profileData.contractType}
                          </span>
                        </p>
                        <p>
                          Work Location:{" "}
                          <span className="text-primary">
                            {profileData.location}
                          </span>
                        </p>
                      </>
                    )}
                  </Col>

                  {/* Right Column with Vertical Divider */}
                  <Col xs={12} md={6} className="divider-column" style={{paddingLeft:'10%'}}>
                    {/* Edit Button */}
                    <div className="d-flex justify-content-end mb-4">
                      {editMode ? (
                        <Button variant="success" onClick={handleSave}>
                          Save
                        </Button>
                      ) : (
                        
                        <FaEdit
                              size={32}
                              onClick={toggleEditMode}
                              className=" edit-btn text-success cursor-pointer"
                              style={{backgroundColor:"white"}}
                        />
                        
                      )}
                    </div>

                    {/* Contact Information */}
                    <h5 className="fw-bold text-secondary">
                      Contact Information
                    </h5>
                    {editMode ? (
                      <>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="emergencyContact"
                          value={profileData.emergencyContact}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="dob"
                          value={profileData.dob}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="gender"
                          value={profileData.gender}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="maritalStatus"
                          value={profileData.maritalStatus}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="qualification"
                          value={profileData.qualification}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="panNumber"
                          value={profileData.panNumber}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                      </>
                    ) : (
                      <>
                        <p>
                          Email:{" "}
                          <span className="text-primary">
                            {profileData.email}
                          </span>
                        </p>
                        <p>
                          Phone:{" "}
                          <span className="text-primary">
                            {profileData.phone}
                          </span>
                        </p>
                        <p>
                          Address:{" "}
                          <span className="text-primary">
                            {profileData.address}
                          </span>
                        </p>
                        <p>
                          Emergency Contact:{" "}
                          <span className="text-primary">
                            {profileData.emergencyContact}
                          </span>
                        </p>
                        <p>
                          Date of Birth:{" "}
                          <span className="text-primary">
                            {profileData.dob}
                          </span>
                        </p>
                        <p>
                          Gender:{" "}
                          <span className="text-primary">
                            {profileData.gender}
                          </span>
                        </p>
                        <p>
                          Marital Status:{" "}
                          <span className="text-primary">
                            {profileData.maritalStatus}
                          </span>
                        </p>
                        <p>
                          Qualification:{" "}
                          <span className="text-primary">
                            {profileData.qualification}
                          </span>
                        </p>
                        <p>
                          PAN Number:{" "}
                          <span className="text-primary">
                            {profileData.panNumber}
                          </span>
                        </p>
                      </>
                    )}

                    <hr />

                    {/* Bank Details */}
                    <h5 className="fw-bold text-secondary">Bank Details</h5>
                    {editMode ? (
                      <>
                        <Form.Control
                          type="text"
                          name="bankName"
                          value={profileData.bankName}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="accountNo"
                          value={profileData.accountNo}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                        <Form.Control
                          type="text"
                          name="ifscCode"
                          value={profileData.ifscCode}
                          onChange={handleInputChange}
                          className="mb-3 form-control"
                        />
                      </>
                    ) : (
                      <>
                        <p>
                          Bank Name:{" "}
                          <span className="text-primary">
                            {profileData.bankName}
                          </span>
                        </p>
                        <p>
                          Account No:{" "}
                          <span className="text-primary">
                            {profileData.accountNo}
                          </span>
                        </p>
                        <p>
                          IFSC Code:{" "}
                          <span className="text-primary">
                            {profileData.ifscCode}
                          </span>
                        </p>
                      </>
                    )}
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminSetting;
