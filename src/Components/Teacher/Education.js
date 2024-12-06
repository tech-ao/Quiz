import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <Container className="p-4 bg-light">
      <h3 className="mb-4">Educational Qualifications & Professional Experience</h3>
      <Form onSubmit={handleSubmit}>
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons: Back, Save, and Next */}
        <Row className="mt-4">
          <Col sm={3}>
            <Button variant="secondary" className="w-100">
              Back
            </Button>
          </Col>
          <Col sm={{ span: 6, offset: 3 }} className="d-flex justify-content-end">
            <Button variant="primary" className="me-2">
              Save
            </Button>
            <Button variant="success">
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EducationAndExperienceForm;
