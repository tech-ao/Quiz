import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddTeacher = ({ show, handleClose, handleSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        email: '',
        permanentAddress: '',
        residentialAddress: '',
        nationality: '',
        candidatePhoto: null,
        photoID: null,
        highestEducation: '',
        institutions: '',
        degrees: '',
        specialization: '',
        graduationYear: '',
        currentEmployer: '',
        jobTitle: '',
        experienceYears: '',
        availability: '',
        workSchedule: '',
        preferredCountries: '',
        graduationPhoto: null,
        experienceProof: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Enter a valid email address';
        if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent Address is required';
        if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
        if (!formData.highestEducation.trim()) newErrors.highestEducation = 'Highest Education is required';
        if (!formData.institutions.trim()) newErrors.institutions = 'Institutions Attended is required';
        if (!formData.degrees.trim()) newErrors.degrees = 'Degrees/Certifications is required';
        if (!formData.specialization.trim()) newErrors.specialization = 'Subject Specialization is required';
        if (!formData.graduationYear.match(/^\d{4}$/)) newErrors.graduationYear = 'Graduation Year must be a 4-digit number';
        if (!formData.currentEmployer.trim()) newErrors.currentEmployer = 'Current Employer is required';
        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required';
        if (!formData.experienceYears.match(/^\d+$/)) newErrors.experienceYears = 'Years of Experience must be a number';
        if (!formData.availability) newErrors.availability = 'Availability is required';
        if (!formData.workSchedule.trim()) newErrors.workSchedule = 'Preferred Work Schedule is required';
        if (!formData.preferredCountries) newErrors.preferredCountries = 'Preferred Countries is required';
        if (!formData.candidatePhoto) newErrors.candidatePhoto = 'Candidate photo is required';
        if (!formData.photoID) newErrors.photoID = 'Photo ID is required';
        if (!formData.graduationPhoto) newErrors.graduationPhoto = 'Graduation Photo is required';
        if (!formData.experienceProof) newErrors.experienceProof = 'Experience Proof is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(formData);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitForm}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    isInvalid={!!errors.dob}
                                />
                                <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    isInvalid={!!errors.gender}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Permanent Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleChange}
                                    isInvalid={!!errors.permanentAddress}
                                />
                                <Form.Control.Feedback type="invalid">{errors.permanentAddress}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nationality</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    isInvalid={!!errors.nationality}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Highest Education</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="highestEducation"
                                    value={formData.highestEducation}
                                    onChange={handleChange}
                                    isInvalid={!!errors.highestEducation}
                                />
                                <Form.Control.Feedback type="invalid">{errors.highestEducation}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Institutions Attended</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="institutions"
                                    value={formData.institutions}
                                    onChange={handleChange}
                                    isInvalid={!!errors.institutions}
                                />
                                <Form.Control.Feedback type="invalid">{errors.institutions}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Degrees/Certifications</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="degrees"
                                    value={formData.degrees}
                                    onChange={handleChange}
                                    isInvalid={!!errors.degrees}
                                />
                                <Form.Control.Feedback type="invalid">{errors.degrees}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Subject Specialization</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    isInvalid={!!errors.specialization}
                                />
                                <Form.Control.Feedback type="invalid">{errors.specialization}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Graduation Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="graduationYear"
                                    value={formData.graduationYear}
                                    onChange={handleChange}
                                    isInvalid={!!errors.graduationYear}
                                />
                                <Form.Control.Feedback type="invalid">{errors.graduationYear}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Current Employer</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="currentEmployer"
                                    value={formData.currentEmployer}
                                    onChange={handleChange}
                                    isInvalid={!!errors.currentEmployer}
                                />
                                <Form.Control.Feedback type="invalid">{errors.currentEmployer}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    isInvalid={!!errors.jobTitle}
                                />
                                <Form.Control.Feedback type="invalid">{errors.jobTitle}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Years of Experience</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="experienceYears"
                                    value={formData.experienceYears}
                                    onChange={handleChange}
                                    isInvalid={!!errors.experienceYears}
                                />
                                <Form.Control.Feedback type="invalid">{errors.experienceYears}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Availability</Form.Label>
                                <Form.Select
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleChange}
                                    isInvalid={!!errors.availability}
                                >
                                    <option value="">Select Availability</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.availability}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Preferred Work Schedule</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="workSchedule"
                                    value={formData.workSchedule}
                                    onChange={handleChange}
                                    isInvalid={!!errors.workSchedule}
                                />
                                <Form.Control.Feedback type="invalid">{errors.workSchedule}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Preferred Countries</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="preferredCountries"
                                    value={formData.preferredCountries}
                                    onChange={handleChange}
                                    isInvalid={!!errors.preferredCountries}
                                />
                                <Form.Control.Feedback type="invalid">{errors.preferredCountries}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Candidate Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="candidatePhoto"
                                    onChange={handleFileChange}
                                    isInvalid={!!errors.candidatePhoto}
                                />
                                <Form.Control.Feedback type="invalid">{errors.candidatePhoto}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Photo ID</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="photoID"
                                    onChange={handleFileChange}
                                    isInvalid={!!errors.photoID}
                                />
                                <Form.Control.Feedback type="invalid">{errors.photoID}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Graduation Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="graduationPhoto"
                                    onChange={handleFileChange}
                                    isInvalid={!!errors.graduationPhoto}
                                />
                                <Form.Control.Feedback type="invalid">{errors.graduationPhoto}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Experience Proof</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="experienceProof"
                                    onChange={handleFileChange}
                                    isInvalid={!!errors.experienceProof}
                                />
                                <Form.Control.Feedback type="invalid">{errors.experienceProof}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="mt-3">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTeacher;
