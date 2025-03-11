import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addTeacherAction } from "../../redux/Action/TeacherAction";
import './RegisterTeacher.css';
import { fetchGenders } from "../../redux/Services/Enum"; // Added import for fetchGenders

const TeacherFirstLogin = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    permanentAddress: "",
    currentAddress: "",
    nationality: "",
    candidatePhoto: null,
    photoId: null,
    highestQualification: "",
    institutionsAttended: "",
    degreesCertifications: "",
    subjectSpecialization: "",
    graduationCertificate: null,
    employer: "",
    jobTitle: "",
    experienceCertificate: null,
    teacherResume: null,
  });

  const [genders, setGenders] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  // Handle input changes, including checkbox if needed
  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Assuming a fetchGenders function exists.
        const gendersData = await fetchGenders();
        setGenders(gendersData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        toast.error("Failed to load form data.");
      }
    };

    fetchAllData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Personal Information validations
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Phone Number must be 10 digits.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid Email Address.";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Permanent Address is required.";
    if (!formData.currentAddress.trim())
      newErrors.currentAddress = "Current Residential Address is required.";
    if (!formData.nationality.trim())
      newErrors.nationality = "Nationality is required.";
    if (!formData.candidatePhoto)
      newErrors.candidatePhoto = "Candidate Photo is required.";
    if (!formData.photoId)
      newErrors.photoId = "Photo ID is required.";

    // Educational Qualifications validations
    if (!formData.highestQualification.trim())
      newErrors.highestQualification = "Highest Qualification is required.";
    if (!formData.institutionsAttended.trim())
      newErrors.institutionsAttended = "Institution(s) Attended is required.";
    if (!formData.degreesCertifications.trim())
      newErrors.degreesCertifications = "Degrees/Certifications are required.";
    if (!formData.subjectSpecialization.trim())
      newErrors.subjectSpecialization = "Subject Specialization is required.";
    if (!formData.graduationCertificate)
      newErrors.graduationCertificate = "Graduation Certificate is required.";

    // Professional Experience validations
    if (!formData.employer.trim())
      newErrors.employer = "Current/Previous Employer is required.";
    if (!formData.jobTitle.trim())
      newErrors.jobTitle = "Job Title is required.";
    if (!formData.experienceCertificate)
      newErrors.experienceCertificate = "Experience Certificate is required.";

    // Resume upload validation
    if (!formData.teacherResume)
      newErrors.teacherResume = "Resume is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        console.log("Submitting Data:", formData);
        setIsSubmitting(true);
        await dispatch(addTeacherAction(formData));
        toast.success("Teacher information registered successfully!");
      } catch (error) {
        toast.error("Failed to register teacher!");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fix the errors before proceeding.");
    }
  };

  return (
    <Container className="register-teacher-container">
      <h3 className="mb-4">Register Teacher</h3>
      <Form noValidate>
        {/* Personal Information */}
        <h5 className="mb-3">Personal Information</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                isInvalid={!!errors.fullName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                isInvalid={!!errors.dob}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                isInvalid={!!errors.gender}
                required
              >
                <option value="">Select Gender</option>
                {genders.map((gender, index) => (
                  <option key={index} value={gender.item1}>
                    {gender.item2}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                isInvalid={!!errors.phoneNumber}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                isInvalid={!!errors.nationality}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.nationality}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="permanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                isInvalid={!!errors.permanentAddress}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.permanentAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="currentAddress">
              <Form.Label>Current Residential Address</Form.Label>
              <Form.Control
                type="text"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleInputChange}
                isInvalid={!!errors.currentAddress}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="candidatePhoto">
              <Form.Label>Candidate Photo</Form.Label>
              <Form.Control
                type="file"
                name="candidatePhoto"
                onChange={handleFileChange}
                isInvalid={!!errors.candidatePhoto}
                accept="image/*"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.candidatePhoto}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="photoId">
              <Form.Label>Photo ID</Form.Label>
              <Form.Control
                type="file"
                name="photoId"
                onChange={handleFileChange}
                isInvalid={!!errors.photoId}
                accept="image/*"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.photoId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Educational Qualifications */}
        <h5 className="mb-3">Educational Qualifications</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="highestQualification">
              <Form.Label>Highest Level of Qualification</Form.Label>
              <Form.Control
                type="text"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleInputChange}
                isInvalid={!!errors.highestQualification}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.highestQualification}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="institutionsAttended">
              <Form.Label>Institution(s) Attended</Form.Label>
              <Form.Control
                type="text"
                name="institutionsAttended"
                value={formData.institutionsAttended}
                onChange={handleInputChange}
                isInvalid={!!errors.institutionsAttended}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.institutionsAttended}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="degreesCertifications">
              <Form.Label>Degrees/Certifications</Form.Label>
              <Form.Control
                type="text"
                name="degreesCertifications"
                value={formData.degreesCertifications}
                onChange={handleInputChange}
                isInvalid={!!errors.degreesCertifications}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.degreesCertifications}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="subjectSpecialization">
              <Form.Label>Subject Specialization</Form.Label>
              <Form.Control
                type="text"
                name="subjectSpecialization"
                value={formData.subjectSpecialization}
                onChange={handleInputChange}
                isInvalid={!!errors.subjectSpecialization}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.subjectSpecialization}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="graduationCertificate">
              <Form.Label>Year of Graduation</Form.Label>
              <Form.Control
                type="file"
                name="graduationCertificate"
                onChange={handleFileChange}
                isInvalid={!!errors.graduationCertificate}
                accept="image/*"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.graduationCertificate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Professional Experience */}
        <h5 className="mb-3">Professional Experience</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="employer">
              <Form.Label>Current/Previous Employer</Form.Label>
              <Form.Control
                type="text"
                name="employer"
                value={formData.employer}
                onChange={handleInputChange}
                isInvalid={!!errors.employer}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.employer}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                isInvalid={!!errors.jobTitle}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobTitle}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="experienceCertificate">
              <Form.Label>Year of Experience</Form.Label>
              <Form.Control
                type="file"
                name="experienceCertificate"
                onChange={handleFileChange}
                isInvalid={!!errors.experienceCertificate}
                accept="image/*"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.experienceCertificate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="teacherResume">
              <Form.Label>Upload Resume</Form.Label>
              <Form.Control
                type="file"
                name="teacherResume"
                onChange={handleFileChange}
                isInvalid={!!errors.teacherResume}
                accept="application/pdf, image/*"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.teacherResume}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>


        <Button variant="primary" onClick={handleRegister} disabled={isSubmitting}>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default TeacherFirstLogin;
