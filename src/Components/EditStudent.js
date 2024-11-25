import React, { useState } from "react";
import { Offcanvas, Button, Form, Row, Col } from "react-bootstrap";

const EditStudent = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    address: "",
    countryCode: "+91", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); 

  
    console.log("Student added successfully!");

    onClose(); 
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Student</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formStudentFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formStudentLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formStudentEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Row>
                <Col xs={3}>
                  <Form.Select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (Australia)</option>
                    {/* Add more country codes as needed */}
                  </Form.Select>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Grade</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              {/* Add more grades as needed */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Student
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditStudent;
