import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaSave } from 'react-icons/fa'; // Import edit and save icons
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
  
  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    qualification: '',
    staffId: '',
    role: '',
    designation: '',
    joiningDate: '',
    salary: '',
    contractType: '',
    location: ''
  });
  
  // State for profile pic upload
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
        
        // For development purposes, set default data if API returns empty
        const defaultData = {
          name: "Andrews",
          email: "andrews.tech@gmail.com",
          phone: "61+ 6065 6528",
          address: "21b-Square Area, Belgium",
          gender: "Male",
          qualification: "Master Degree in Mathematical",
          staffId: "T12345",
          role: "Senior Teacher",
          designation: "Mathematics Faculty",
          joiningDate: "01/15/2020",
          salary: "5000",
          contractType: "Full-time",
          location: "Main Campus"
        };
        
        // Merge API data with default data for any missing fields
        const mergedData = adminResponse.data ? { ...defaultData, ...adminResponse.data } : defaultData;
        setAdminData(mergedData);
        setEditData(mergedData);
      } catch (error) {
        console.error("API Error:", error);
        // Use default data if API fails
        const defaultData = {
          name: "Andrews",
          email: "andrews.tech@gmail.com",
          phone: "61+ 6065 6528",
          address: "21b-Square Area, Belgium",
          gender: "Male",
          qualification: "Master Degree in Mathematical",
          staffId: "T12345",
          role: "Senior Teacher",
          designation: "Mathematics Faculty",
          joiningDate: "01/15/2020",
          salary: "5000",
          contractType: "Full-time",
          location: "Main Campus"
        };
        setAdminData(defaultData);
        setEditData(defaultData);
        setError("Failed to load teacher data. Using sample data instead.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  // Section edit handler
  const handleEdit = (section) => {
    if (section === 'profile-picture') {
      setShowProfilePicModal(true);
      return;
    }
    
    setCurrentSection(section);
    setShowEditModal(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle save for text fields
  const handleSave = () => {
    // Here you would typically make an API call to update the data
    // For now, we'll just update the local state
    setAdminData(editData);
    setShowEditModal(false);
    
    // Success message
    alert("Profile updated successfully!");
  };
  
  // Handle profile picture change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle profile picture upload
  const handleUploadPicture = () => {
    // Here you would typically upload the file to a server
    // For now, we'll just update the preview as if it was successful
    if (previewUrl) {
      // In a real app, you'd update the profile pic URL after successful upload
      // For now, we just close the modal since we're showing the preview image
      setShowProfilePicModal(false);
      alert("Profile picture updated successfully!");
    } else {
      alert("Please select an image first.");
    }
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
  
  // Get modal fields based on current section
  const getModalFields = () => {
    switch (currentSection) {
      case 'contact':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={editData.email || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                name="phone" 
                value={editData.phone || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                name="address" 
                value={editData.address || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={editData.gender || ''} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control 
                type="text" 
                name="qualification" 
                value={editData.qualification || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
          </>
        );
      
      case 'staff':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={editData.name || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Staff ID</Form.Label>
              <Form.Control 
                type="text" 
                name="staffId" 
                value={editData.staffId || ''} 
                onChange={handleInputChange}
                readOnly 
              />
              <Form.Text className="text-muted">Staff ID cannot be changed</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control 
                type="text" 
                name="role" 
                value={editData.role || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control 
                type="text" 
                name="designation" 
                value={editData.designation || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control 
                type="text" 
                name="joiningDate" 
                value={editData.joiningDate || ''} 
                onChange={handleInputChange}
                readOnly 
              />
              <Form.Text className="text-muted">Joining date cannot be changed</Form.Text>
            </Form.Group>
          </>
        );
      
      case 'salary':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Basic Salary</Form.Label>
              <Form.Control 
                type="text" 
                name="salary" 
                value={editData.salary || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contract Type</Form.Label>
              <Form.Select name="contractType" value={editData.contractType || ''} onChange={handleInputChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Work Location</Form.Label>
              <Form.Control 
                type="text" 
                name="location" 
                value={editData.location || ''} 
                onChange={handleInputChange} 
              />
            </Form.Group>
          </>
        );
      
      default:
        return null;
    }
  };

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
                          src={previewUrl || profilePic}
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
                      <p>Email: <span className="text-primary">{adminData?.email || "andrews.tech@gmail.com"}</span></p>
                      <p>Phone: <span className="text-primary">{adminData?.phone || "61+ 6065 6528"}</span></p>
                      <p>Address: <span className="text-primary">{adminData?.address || "21b-Square Area, Belgium"}</span></p>
                      <p>Gender: <span className="text-primary">{adminData?.gender || "Male"}</span></p>
                      <p>Qualification: <span className="text-primary">{adminData?.qualification || "Master Degree in Mathematical"}</span></p>
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
                        src={previewUrl || profilePic}
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
                    <p>Email: <span className="text-primary">{adminData?.email || "andrews.tech@gmail.com"}</span></p>
                    <p>Phone: <span className="text-primary">{adminData?.phone || "61+ 6065 6528"}</span></p>
                    <p>Address: <span className="text-primary">{adminData?.address || "21b-Square Area, Belgium"}</span></p>
                    <p>Gender: <span className="text-primary">{adminData?.gender || "Male"}</span></p>
                    <p>Qualification: <span className="text-primary">{adminData?.qualification || "Master Degree in Mathematical"}</span></p>
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
      
      {/* Edit Modal for Text Fields */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit {currentSection === 'contact' ? 'Contact Information' : 
                 currentSection === 'staff' ? 'Staff Information' : 
                 currentSection === 'salary' ? 'Contract & Salary' : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {getModalFields()}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            <FaSave className="me-2" /> Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Profile Picture Upload Modal */}
      <Modal show={showProfilePicModal} onHide={() => setShowProfilePicModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <Image 
              src={previewUrl || profilePic} 
              roundedCircle 
              style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
            />
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select new profile picture</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfilePicModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUploadPicture}>
            <FaSave className="me-2" /> Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherSettings;