import React, { useState , useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const EditStudent = ({ show, onClose }) => {
  
  const { selectedStudent } = useSelector((state) => state.students);
  

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

  useEffect(() => {
    if (selectedStudent && selectedStudent?.user) {
      setFormData({
        firstName: selectedStudent.user.firstName || "",
        lastName: selectedStudent.user.lastName || "",
        email: selectedStudent.user.email || "",
        phoneNumber: selectedStudent.user.phoneNumber || "",
        dob: selectedStudent.user.dob || "",
        grade: selectedStudent.user.Grade || "",
        address: selectedStudent.user.address || "",
        countryCode: selectedStudent.user.countryCode || "+91",
      });
    }
  }, [selectedStudent]);

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
    <Modal show={show} onHide={onClose} placement="end">
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <option value="1">Abacus Beginner</option>
              <option value="2">Abacus Explorer</option>
              <option value="3">Abacus Skilled</option>
              <option value="4">Abacus Expert</option>
              <option value="5">Abacus Mastermind</option>
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

          <Button variant="success" type="submit">
            Save Student
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStudent;
