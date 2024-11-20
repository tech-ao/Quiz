import React from 'react';
import { Offcanvas, Button, Form, Row, Col } from 'react-bootstrap';

const EditStudent = ({ show, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student added successfully!');
    onClose(); // Close the form after submission
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Student</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formStudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formStudentEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" required />
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
