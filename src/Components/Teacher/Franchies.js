import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { editTeacherAction } from "../../redux/Action/TeacherAction";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const FranchiseRequirementsForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    availability: '',
    workSchedule: '',
    preferredCountry: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.availability) newErrors.availability = "Please select your availability.";
    if (!formData.workSchedule.trim()) newErrors.workSchedule = "Preferred work schedule is required.";
    if (!formData.preferredCountry) newErrors.preferredCountry = "Please select a preferred country.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
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

  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Proceeding with Data:', formData);
      alert('Proceeding to the next step!');
    } else {
      toast.error('Please fix the errors before proceeding.');
    }
  };

  return (
    <Container className="p-4 bg-light">
      <h3 className="mb-4">Franchise-Specific Requirements</h3>
      <Form onSubmit={handleSave} className="p-4">
        {/* Row 1: Availability and Preferred Work Schedule */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Availability</Form.Label>
              <div>
                {['Full-time', 'Part-time', 'Temporary'].map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    name="availability"
                    label={option}
                    value={option}
                    checked={formData.availability === option}
                    onChange={handleInputChange}
                    inline
                  />
                ))}
              </div>
              {errors.availability && <div className="text-danger">{errors.availability}</div>}
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
                isInvalid={!!errors.workSchedule}
              />
              <Form.Control.Feedback type="invalid">{errors.workSchedule}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Row 2: Preferred Country */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Preferred Country</Form.Label>
              <div>
                {['India', 'Other'].map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    name="preferredCountry"
                    label={option}
                    value={option}
                    checked={formData.preferredCountry === option}
                    onChange={handleInputChange}
                    inline
                  />
                ))}
              </div>
              {errors.preferredCountry && <div className="text-danger">{errors.preferredCountry}</div>}
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

export default FranchiseRequirementsForm;
