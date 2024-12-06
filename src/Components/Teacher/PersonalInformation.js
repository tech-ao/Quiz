import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const PersonalInformationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    permanentAddress: '',
    residentialAddress: '',
    nationality: '',
    photo: null,
    photoID: null,
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
      <h3 className="mb-4">Personal Information</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
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
                required
              />
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
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
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
            <Form.Group controlId="nationality">
              <Form.Label>Nationality/Residency Status</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="permanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                name="permanentAddress"
                rows={2}
                value={formData.permanentAddress}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="residentialAddress">
              <Form.Label>Current Residential Address</Form.Label>
              <Form.Control
                as="textarea"
                name="residentialAddress"
                rows={2}
                value={formData.residentialAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="photo">
              <Form.Label>Candidate Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="photoID">
              <Form.Label>Photo ID</Form.Label>
              <Form.Control
                type="file"
                name="photoID"
                accept="image/*,application/pdf"
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

export default PersonalInformationForm;