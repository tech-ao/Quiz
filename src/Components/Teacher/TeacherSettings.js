import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';
import { fetchProfileById, fetchGenders, fetchCountries } from '../../redux/Services/Enum';
import { editTeacher } from '../../redux/Services/api';
import { useLocation } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeacher } from "../../redux/Action/TeacherAction";
import StudentData from './StudentData';


const TeacherSettings = () => {
 
 
    const [teacherData, setTeacherData] = useState(null);
    const [error, setError] = useState(null);    
    const [loading, setLoading] = useState(true);
    const location = useLocation();
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

  const { students } = useSelector((state) => state.students);
console.log(students);
const teacherDetails = useSelector((state) => state.teachers?.selectedTeacher?.data);
console.log(teacherDetails);

    const dispatch = useDispatch();
  
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
    const storedTeacherData = localStorage.getItem("teacherData");
  
    if (storedTeacherData) {
      try {
        setTeacherData(JSON.parse(storedTeacherData)); // Parse and set
      } catch (error) {
        console.error("Error parsing teacherData:", error);
        localStorage.removeItem("teacherData"); // Remove corrupted data
      }
    }
  }, []);

  console.log(teacherData);
  

  useEffect(() => {
    dispatch(fetchTeacher(teacherData?.userData.teacherId));
  }, [dispatch, teacherData?.userData.teacherId]);

  
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
        
        if (teacherDetails) {
          setFormData({
            name: teacherDetails.name || '',
            dob: teacherDetails.dob ? formatDate(teacherData.dob) : '',
            gender: teacherDetails.gender || null,
            phoneNumber: teacherDetails.phoneNumber || '',
            email: teacherDetails.email || '',
            nationality: teacherDetails.nationality || null,
            permanentAddress: teacherDetails.permanentAddress || '',
            currentAddress: teacherDetails.currentAddress || '',
            experienceCertificate: teacherDetails.experienceCertificate || null,
            resume: teacherDetails.resume || null
          });
          
          // Set file previews if URLs exist
          if (teacherDetails.experienceCertificate) {
            setExpCertPreview(teacherDetails.experienceCertificate);
          }
          if (teacherDetails.resume) {
            setResumePreview(teacherDetails.resume);
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
  useEffect(() => {
    const storedTeacherData = localStorage.getItem("teacherData");
  
    if (storedTeacherData) {
      try {
        setTeacherData(JSON.parse(storedTeacherData)); // Parse and set
      } catch (error) {
        console.error("Error parsing teacherData:", error);
        localStorage.removeItem("teacherData"); // Remove corrupted data
      }
    }
  }, []);

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


      console.log(teacherData);
      
      
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

      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel teachingModeid ={teacherData?.userData?.stausId}/>}
        <Container className="main-container ">           
          {/* Moved Sticky Header to main-container */}
          <div className="sticky-header d-flex justify-content-between align-items-center">
            <h2 className="fw-bold text-dark">teacher Settings</h2>
            <FaEdit
              size={24}
              className="text-success cursor-pointer"
              // onClick={handleOpenEditteacher}
            />
          </div>
          <div className="sub-container">
           

            <Card className="p-4">
              <Card.Body className="d-flex flex-column align-items-center">
                <div
                  style={{
                    border: "5px solid #4caf50",
                    borderRadius: "50%",
                    padding: "5px",
                    display: "inline-block",
                    height: "171px",
                  }}
                >
                  {/* {loading ? (
                    <p>Loading image...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : profileImage ? (
                    <Image
                      src={`data:image/jpeg;base64,${profileImage}`}
                      alt="Profile"
                      roundedCircle
                      width="150"
                      height="150px"
                    />
                  ) : (
                    <p>No image available</p>
                  )} */}
                </div>

                <Row className="mt-4 w-100">
                  <Col md={4}>
                    <strong>First Name:</strong>
                    <p>{teacherDetails?.fullName || "N/A"}</p>
                  </Col>
               
                  <Col md={4}>
                    <strong>Email:</strong>
                    <p>{teacherDetails?.email || "N/A"}</p>
                  </Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}>
                    <strong>Phone:</strong>
                    <p>{teacherDetails?.countryCode} {teacherDetails?.phoneNumber || "N/A"}</p>
                  </Col>
                  <Col md={4}>
                    <strong>Date of Birth:</strong>
                    <p>
                      {teacherDetails?.dob 
                        ? new Date(teacherDetails.dob).toLocaleDateString('en-GB')
                        : "N/A"}
                    </p>
                  </Col>
                  <Col md={4}>
                    <strong>Gender:</strong>
                    <p>{teacherDetails?.genderName || "N/A"}</p>
                  </Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}>
                    <strong>Register Number:</strong>
                    <p>{teacherDetails?.registerNo || "N/A"}</p>
                  </Col>
                 
                  <Col md={4}>
                    <strong>Status:</strong>
                    <p>{teacherDetails?.statusName || "N/A"}</p>
                  </Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}>
                    <strong>Address:</strong>
                    <p>{teacherDetails?.permanentAddress || "N/A"}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>

      {/* {showEditteacher && (
        <SettingEdit
          show={showEditteacher}
          onClose={handleCloseEditteacher}
          teacherId={selectedteacherId}
        />
      )} */}
    </div>
  );
};

export default TeacherSettings;