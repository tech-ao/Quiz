import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ReferencesAndResumeForm = () => {
  const [formData, setFormData] = useState({
    references: '',
    resume: '',
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
      <h3 className="mb-4">References and Resume</h3>
      <Form onSubmit={handleSubmit} className="p-4 ">
        {/* Row 1: Professional References */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Professional References</Form.Label>
              <Form.Control
                type="file"
                name="references"
                onChange={handleFileChange}
                required
              />
              <Form.Text className="text-muted">
                Minimum 2-3 references from previous employers or colleagues.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* Row 2: Resume */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Resume</Form.Label>
              <Form.Control
                type="file"
                name="resume"
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

export default ReferencesAndResumeForm;
