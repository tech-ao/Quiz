import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';
import { fetchProfileById, fetchGenders, fetchCountries } from '../../redux/Services/Enum';
import { editTeacher } from '../../redux/Services/api';

const TeacherSettings = () => {
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: null,
    phoneNumber: '',
    email: '',
    nationality: null,
    permanentAddress: '',
    currentAddress: '',
    experienceCertificate: null,
    resume: null
  });
  
  // Dropdown options
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  
  // File preview states
  const [expCertPreview, setExpCertPreview] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);


  
    const toggleSidebar = () => {
      setIsSidebarVisible((prev) => !prev);
    };
  
     const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 992);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isMdLayout, setIsMdLayout] = useState(window.innerWidth >= 768 && window.innerWidth < 992);
  
    useEffect(() => {
      const handleResize = () => {
        setIsSidebarVisible(window.innerWidth >= 992);
        setIsSmallScreen(window.innerWidth < 768);
        setIsMdLayout(window.innerWidth >= 768 && window.innerWidth < 992);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch dropdown options and teacher data in parallel
        const [countriesData, gendersData, teacherData] = await Promise.all([
          fetchCountries(),
          fetchGenders(),
          fetchProfileById() // Assuming this gets the current teacher's profile
        ]);
        
        setCountries(countriesData);
        setGenders(gendersData);
        
        if (teacherData) {
          setFormData({
            name: teacherData.name || '',
            dob: teacherData.dob ? formatDate(teacherData.dob) : '',
            gender: teacherData.gender || null,
            phoneNumber: teacherData.phoneNumber || '',
            email: teacherData.email || '',
            nationality: teacherData.nationality || null,
            permanentAddress: teacherData.permanentAddress || '',
            currentAddress: teacherData.currentAddress || '',
            experienceCertificate: teacherData.experienceCertificate || null,
            resume: teacherData.resume || null
          });
          
          // Set file previews if URLs exist
          if (teacherData.experienceCertificate) {
            setExpCertPreview(teacherData.experienceCertificate);
          }
          if (teacherData.resume) {
            setResumePreview(teacherData.resume);
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load teacher data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (name === 'experienceCertificate') {
          setExpCertPreview(event.target.result);
        } else if (name === 'resume') {
          setResumePreview(event.target.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Prepare form data
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      
      // Call editTeacher API
      const response = await editTeacher(formDataToSend);
      
      if (response.success) {
        alert("Profile updated successfully!");
        // Refresh data
        const updatedTeacher = await fetchProfileById();
        if (updatedTeacher) {
          setFormData(prev => ({
            ...prev,
            ...updatedTeacher,
            dob: updatedTeacher.dob ? formatDate(updatedTeacher.dob) : ''
          }));
        }
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
           <div className="d-flex flex-column flex-md-row">
             {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container" style={{ width: "94%" }}>
          <div className="sticky-top bg-white z-1 pt-1 px-4">
        <Row className="mb-2"> {/* Reduced margin for compact look */}
          <Col md={8}>
            <h2 className="fw-bold mb-3">Teacher Settings</h2> {/* mb-0 removes extra space */}
          </Col>
        </Row>
      </div>

            <Card className="p-4 shadow-lg">
              <Form onSubmit={handleSubmit}>
                {/* Basic Information Row */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formDob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Gender and Phone Row */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formGender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          gender: e.target.value ? parseInt(e.target.value) : null
                        }))}
                        required
                      >
                        <option value="">Select Gender</option>
                        {genders.map(gender => (
                          <option key={gender.item1} value={gender.item1}>
                            {gender.item2}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email and Nationality Row */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formNationality">
                      <Form.Label>Nationality</Form.Label>
                      <Form.Select
                        name="nationality"
                        value={formData.nationality || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          nationality: e.target.value ? parseInt(e.target.value) : null
                        }))}
                        required
                      >
                        <option value="">Select Nationality</option>
                        {countries.map(country => (
                          <option key={country.item1} value={country.item1}>
                            {country.item2}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Address Row */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formPermanentAddress">
                      <Form.Label>Permanent Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCurrentAddress">
                      <Form.Label>Current Residential Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Document Uploads Section */}
                <h5 className="mt-4 mb-3">Document Uploads</h5>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formExperienceCertificate">
                      <Form.Label>Experience Certificate</Form.Label>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="file"
                          name="experienceCertificate"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="me-2"
                        />
                        {expCertPreview && (
                          <Button 
                            variant="link" 
                            href={expCertPreview} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </Button>
                        )}
                      </div>
                      <Form.Text className="text-muted">
                        File size less than 2MB
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formResume">
                      <Form.Label>Upload Resume</Form.Label>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="file"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="me-2"
                        />
                        {resumePreview && (
                          <Button 
                            variant="link" 
                            href={resumePreview} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </Button>
                        )}
                      </div>
                      <Form.Text className="text-muted">
                        File size less than 2MB
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </Container>
      </div>
      </div>
  
  );
};

export default TeacherSettings;