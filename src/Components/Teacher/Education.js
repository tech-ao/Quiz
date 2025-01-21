import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { editTeacherAction } from "../../redux/Action/TeacherAction";
import { useDispatch } from 'react-redux';


const EducationAndExperienceForm = () => {
  const [formData, setFormData] = useState({
    highestEducation: '',
    institution: '',
    degree: '',
    specialization: '',
    graduationYear: '',
    graduationPhoto: null,
    employer: '',
    jobTitle: '',
    experienceYears: '',
    experiencePhoto: null,
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.highestEducation.trim()) newErrors.highestEducation = 'Highest Education is required.';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required.';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required.';
    if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required.';
    if (!formData.graduationYear.match(/^\d{4}$/)) newErrors.graduationYear = 'Graduation Year must be a valid year.';
    if (!formData.graduationPhoto) newErrors.graduationPhoto = 'Graduation Photo is required.';
    if (!formData.employer.trim()) newErrors.employer = 'Employer is required.';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required.';
    if (!formData.experienceYears.match(/^\d+$/)) newErrors.experienceYears = 'Years of Experience must be a valid number.';
    if (!formData.experiencePhoto) newErrors.experiencePhoto = 'Experience Photo is required.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      dispatch(editTeacherAction(formDataToSend));
      toast.success('Form saved successfully!');
    } else {
      toast.error('Please fix the errors before saving.');
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Proceeding with Data:', formData);
      alert('Proceeding to the next step!');
    } else {
      toast.error('Please fix the errors before proceeding.');
    }
  };

  return (
    <Container className="p-4 bg-light">
      <h3 className="mb-4">Educational Qualifications & Professional Experience</h3>
      <Form>
        <h5 className="mb-3">2. Educational Qualifications</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="highestEducation">
              <Form.Label>Highest Level of Education</Form.Label>
              <Form.Control
                type="text"
                name="highestEducation"
                value={formData.highestEducation}
                onChange={handleInputChange}
                isInvalid={!!errors.highestEducation}
              />
              <Form.Control.Feedback type="invalid">{errors.highestEducation}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="institution">
              <Form.Label>Institution(s) Attended</Form.Label>
              <Form.Control
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                isInvalid={!!errors.institution}
              />
              <Form.Control.Feedback type="invalid">{errors.institution}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="degree">
              <Form.Label>Degrees/Certifications</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                isInvalid={!!errors.degree}
              />
              <Form.Control.Feedback type="invalid">{errors.degree}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="specialization">
              <Form.Label>Subject Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                isInvalid={!!errors.specialization}
              />
              <Form.Control.Feedback type="invalid">{errors.specialization}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="graduationYear">
              <Form.Label>Year of Graduation</Form.Label>
              <Form.Control
                type="text"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                isInvalid={!!errors.graduationYear}
              />
              <Form.Control.Feedback type="invalid">{errors.graduationYear}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="graduationPhoto">
              <Form.Label>Graduation Photo</Form.Label>
              <Form.Control
                type="file"
                name="graduationPhoto"
                accept="image/*"
                onChange={handleFileChange}
                isInvalid={!!errors.graduationPhoto}
              />
              <Form.Control.Feedback type="invalid">{errors.graduationPhoto}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mb-3">3. Professional Experience</h5>
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
              />
              <Form.Control.Feedback type="invalid">{errors.employer}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title(s)</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                isInvalid={!!errors.jobTitle}
              />
              <Form.Control.Feedback type="invalid">{errors.jobTitle}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="experienceYears">
              <Form.Label>Years of Experience</Form.Label>
              <Form.Control
                type="text"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                isInvalid={!!errors.experienceYears}
              />
              <Form.Control.Feedback type="invalid">{errors.experienceYears}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="experiencePhoto">
              <Form.Label>Experience Photo</Form.Label>
              <Form.Control
                type="file"
                name="experiencePhoto"
                accept="image/*"
                onChange={handleFileChange}
                isInvalid={!!errors.experiencePhoto}
              />
              <Form.Control.Feedback type="invalid">{errors.experiencePhoto}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col sm={3}>
            <Button variant="secondary" className="w-100">
              Back
            </Button>
          </Col>
          <Col sm={{ span: 6, offset: 3 }} className="d-flex justify-content-end">
            <Button variant="primary" className="me-2" onClick={handleSave}>
              Save
            </Button>
            <Button variant="success" onClick={handleNext}>
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EducationAndExperienceForm;
