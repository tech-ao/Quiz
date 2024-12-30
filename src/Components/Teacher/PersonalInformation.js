import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {fetchGenders ,fetchCountries} from "../../redux/Services/Enum";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTeacherAction } from "../../redux/Action/TeacherAction";

const PersonalInformationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    email: '',
    permanentAddress: '',
    currentResidentialAddress: '',
    nationalityId: '',
    photo: null,
    photoID: null,
  });
  const [genders, setGenders] = useState([]);
    const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
      const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
         const countriesData = await fetchCountries();
                setCountries(countriesData);
        const gendersData = await fetchGenders();
        setGenders(gendersData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = 'Phone Number must be 10 digits.';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid Email Address.';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent Address is required.';
    if (!formData.nationalityId.trim()) newErrors.nationalityId = 'Nationality is required.';
    if (!formData.photo) newErrors.photo = 'Candidate Photo is required.';
    if (!formData.photoID) newErrors.photoID = 'Photo ID is required.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saved Data:', formData);
      alert('Form saved successfully!');
    } else {
      alert('Please fix the errors before saving.');
    }
  };

  const handleNext = async () => {
    if (validateForm()) {
      try {
        console.log('Proceeding with Data:', formData);
        setIsSubmitting(true);
        await dispatch(addTeacherAction(formData));
        toast.success("Personal Information saved !");
        alert('Proceeding to the next step!');
        
      } catch (error) {
        toast.error("Failed to add student!");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please fix the errors before proceeding.');
    }
  };
  return (
    <Container className="p-4 bg-light">
      <h3 className="mb-4">Personal Information</h3>
      <Form noValidate>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                isInvalid={!!errors.fullName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.dob}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.gender}
                required
              >
                <option value="">Select Gender</option>
                {genders.map((gender, index) => (
                  <option key={index} value={gender.item1}>
                    {gender.item2}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                isInvalid={!!errors.phoneNumber}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
               <Form.Group className="mb-3" controlId="formCountry">
                       <Form.Label>Nationality/Residency Status</Form.Label>
                       <Form.Select
                         name="nationalityId"
                         value={formData.nationalityId}
                         onChange={handleInputChange}
                         required
                       >
                         <option value="">Select Country</option>
                         {countries.map((country, index) => (
                           <option key={index} value={country.item1}>
                             {country.item2}
                           </option>
                         ))}
                       </Form.Select>
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
                isInvalid={!!errors.permanentAddress}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.permanentAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="currentResidentialAddress">
              <Form.Label>Current Residential Address</Form.Label>
              <Form.Control
                as="textarea"
                name="currentResidentialAddress"
                rows={2}
                value={formData.currentResidentialAddress}
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
                isInvalid={!!errors.photo}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.photo}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.photoID}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.photoID}
              </Form.Control.Feedback>
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

export default PersonalInformationForm;
