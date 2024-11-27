import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { addStudentAction } from "../../redux/Action/StudentAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudentPanel = ({ show, onClose }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    address: "",
    countryCode: "+91",
    country: "",
    image: "",
    role:"user"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setFormData({
          ...formData,
          image: file,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    console.log(formData);
    
    e.preventDefault();
    try {
      await dispatch(addStudentAction(formData));
      toast.success("Student added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add student!");
    }
  };

  return (
    <Modal show={show} onHide={onClose} placement="end">
      <Modal.Header closeButton>
        <Modal.Title>Add New Student</Modal.Title>
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

          <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Student Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Form.Group>
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

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

          <Button variant="success" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Add Student"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStudentPanel;
