import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { fetchCountries, fetchGrades, fetchGenders, fetchStudentMode } from "../../redux/Services/Enum";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addTeacherAction } from "../../redux/Action/TeacherAction";
import './RegisterTeacher.css'
const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    country: "",
    classMode: "",
    qualification: "",
    experience: "",
    teacherResume: null,
    teacherIdProof: null,
  });

  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [classModes, setClassModes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);

        const gendersData = await fetchGenders();
        setGenders(gendersData);

        const classModesData = await fetchStudentMode();
        setClassModes(classModesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        toast.error("Failed to load form data.");
      }
    };

    fetchAllData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = "Phone Number must be 10 digits.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid Email Address.";
    if (!formData.country.trim()) newErrors.country = "Nationality is required.";
    if (!formData.classMode) newErrors.classMode = "Class Mode is required.";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required.";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required.";
    if (!formData.teacherResume) newErrors.teacherResume = "Teacher Resume is required.";
    if (!formData.teacherIdProof) newErrors.teacherIdProof = "Teacher ID Proof is required.";

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
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
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

        {/* Gender */}
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

          {/* Phone Number */}
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

        {/* Email */}
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
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.item1}>
                    {country.item2}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          

        </Row>

        {/* Current Residential Address */}
        <Row className="mb-3">

         
          {/* Class Mode */}
          <Col md={6}>
            <Form.Group controlId="classMode">
              <Form.Label>Class Mode</Form.Label>
              <Form.Select
                name="classMode"
                value={formData.classMode}
                onChange={handleInputChange}
                isInvalid={!!errors.classMode}
                required
              >
                <option value="">Select Class Mode</option>
                {classModes.map((mode, index) => (
                  <option key={index} value={mode.item1}>
                    {mode.item2}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.classMode}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

       
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="qualification">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                isInvalid={!!errors.qualification}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.qualification}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Experience */}
          <Col md={6}>
            <Form.Group controlId="experience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                isInvalid={!!errors.experience}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.experience}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* File Uploads */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="teacherResume">
              <Form.Label>Teacher Resume</Form.Label>
              <Form.Control
                type="file"
                name="teacherResume"
                onChange={handleFileChange}
                isInvalid={!!errors.teacherResume}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.teacherResume}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Teacher ID Proof */}
          <Col md={6}>
            <Form.Group controlId="teacherIdProof">
              <Form.Label>Teacher ID Proof</Form.Label>
              <Form.Control
                type="file"
                name="teacherIdProof"
                onChange={handleFileChange}
                isInvalid={!!errors.teacherIdProof}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.teacherIdProof}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button variant="primary" onClick={handleRegister} disabled={isSubmitting}>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterTeacher;
