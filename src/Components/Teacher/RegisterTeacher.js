import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addTeacherAction } from "../../redux/Action/TeacherAction";
import "./RegisterTeacher.css";
import { fetchGenders } from "../../redux/Services/Enum"; // Import for fetching genders

const RegisterTeacher = () => {
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

  // Handle input changes (for text, select, etc.)
  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  // Updated handleFileChange to convert file inputs to base64 strings
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove the data prefix and store only the base64 content
        const base64Content = reader.result.split(",")[1];
        setFormData((prevData) => ({
          ...prevData,
          [name]: base64Content,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
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

    // Professional Experience validations
    if (!formData.experienceCertificate)
      newErrors.experienceCertificate = "Experience Certificate is required.";
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

        {/* Professional Experience */}
        <h5 className="mb-3">Professional Experience</h5>
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

        <Button variant="success" onClick={handleRegister} disabled={isSubmitting}>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterTeacher;
