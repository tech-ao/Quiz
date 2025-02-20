import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { addTeacherAction } from "../../redux/Action/TeacherAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCountries, fetchGrades, fetchGenders, fetchStudentMode } from "../../redux/Services/Enum";


const AddTeacher = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        email: '',
        permanentAddress: '',
        currentResidentialAddress: '',
        nationalityId: '',
        preferedCountryId: null,
        candidatePhoto: null,
        photoID: null,
        higherLevelEducation: '',
        institute: '',
        degrees: '',
        subjectSpecialist: '',
        yearOfGraduation: '',
        employerName: '',
        jobTitle: '',
        yoe: '',
        availability: '',
        workSchedule: '',
        preferredCountries: '',
        graduationPhoto: null,
        experienceProof: null,
    });

    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [grades, setGrades] = useState([]);
    const [genders, setGenders] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log(formData);

            await dispatch(addTeacherAction(formData));

            toast.success("Student added successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to add student!");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const countriesData = await fetchCountries();
                setCountries(countriesData);

                const gradesData = await fetchGrades();
                setGrades(gradesData);

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

    const dispatch = useDispatch();

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
        if (!formData.nationalityId.trim()) newErrors.nationalityId = 'nationalityId is required';
        if (!formData.higherLevelEducation.trim()) newErrors.higherLevelEducation = 'Highest Education is required';
        if (!formData.institute.trim()) newErrors.institute = 'institute Attended is required';
        if (!formData.degrees.trim()) newErrors.degrees = 'Degrees/Certifications is required';
        if (!formData.subjectSpecialist.trim()) newErrors.subjectSpecialist = 'Subject subjectSpecialist is required';
        if (!formData.yearOfGraduation.match(/^\d{4}$/)) newErrors.yearOfGraduation = 'Graduation Year must be a 4-digit number';
        if (!formData.employerName.trim()) newErrors.employerName = 'Current Employer is required';
        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required';
        if (!formData.yoe.match(/^\d+$/)) newErrors.yoe = 'Years of Experience must be a number';
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



    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Row>
                        <h4>Personal Information</h4>
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
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    {genders.map((gender, index) => (
                                        <option key={index} value={gender.item1}>
                                            {gender.item2}
                                        </option>
                                    ))}
                                </Form.Select>
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
                                <Form.Label>nationalityId</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nationalityId"
                                    value={formData.nationalityId}
                                    onChange={handleChange}
                                    isInvalid={!!errors.nationalityId}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nationalityId}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Highest Education</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="higherLevelEducation"
                                    value={formData.higherLevelEducation}
                                    onChange={handleChange}
                                    isInvalid={!!errors.higherLevelEducation}
                                />
                                <Form.Control.Feedback type="invalid">{errors.higherLevelEducation}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <h4>Education Qualification</h4>
                        <Col>
                            <Form.Group>
                                <Form.Label>institute Attended</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="institute"
                                    value={formData.institute}
                                    onChange={handleChange}
                                    isInvalid={!!errors.institute}
                                />
                                <Form.Control.Feedback type="invalid">{errors.institute}</Form.Control.Feedback>
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
                                <Form.Label>Subject subjectSpecialist</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subjectSpecialist"
                                    value={formData.subjectSpecialist}
                                    onChange={handleChange}
                                    isInvalid={!!errors.subjectSpecialist}
                                />
                                <Form.Control.Feedback type="invalid">{errors.subjectSpecialist}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Graduation Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="yearOfGraduation"
                                    value={formData.yearOfGraduation}
                                    onChange={handleChange}
                                    isInvalid={!!errors.yearOfGraduation}
                                />
                                <Form.Control.Feedback type="invalid">{errors.yearOfGraduation}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Current Employer</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employerName"
                                    value={formData.employerName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.employerName}
                                />
                                <Form.Control.Feedback type="invalid">{errors.employerName}</Form.Control.Feedback>
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
                                    name="yoe"
                                    value={formData.yoe}
                                    onChange={handleChange}
                                    isInvalid={!!errors.yoe}
                                />
                                <Form.Control.Feedback type="invalid">{errors.yoe}</Form.Control.Feedback>
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
                                <Form.Label>prefered Country Name</Form.Label>
                                <Form.Select
                                    name="country"
                                    value={formData.preferedCountryId}
                                    onChange={handleChange}
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
