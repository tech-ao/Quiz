import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const FranchiseRequirementsForm = () => {
  const [formData, setFormData] = useState({
    availability: '',
    workSchedule: '',
    preferredCountry: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <Container className="p-4 bg-light">
      <h3 className="mb-4">Franchise-Specific Requirements</h3>
      <Form onSubmit={handleSubmit} className="p-4 ">
        {/* Row 1: Availability and Preferred Work Schedule */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Availability</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  id="full-time"
                  name="availability"
                  label="Full-time"
                  value="Full-time"
                  checked={formData.availability === 'Full-time'}
                  onChange={handleInputChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  id="part-time"
                  name="availability"
                  label="Part-time"
                  value="Part-time"
                  checked={formData.availability === 'Part-time'}
                  onChange={handleInputChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  id="temporary"
                  name="availability"
                  label="Temporary"
                  value="Temporary"
                  checked={formData.availability === 'Temporary'}
                  onChange={handleInputChange}
                  inline
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Preferred Work Schedule</Form.Label>
              <Form.Control
                type="text"
                name="workSchedule"
                placeholder="Enter preferred days/times"
                value={formData.workSchedule}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Row 2: Preferred Country */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Preferred Country</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  id="india"
                  name="preferredCountry"
                  label="India"
                  value="India"
                  checked={formData.preferredCountry === 'India'}
                  onChange={handleInputChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  id="other"
                  name="preferredCountry"
                  label="Other"
                  value="Other"
                  checked={formData.preferredCountry === 'Other'}
                  onChange={handleInputChange}
                  inline
                />
              </div>
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

export default FranchiseRequirementsForm;
