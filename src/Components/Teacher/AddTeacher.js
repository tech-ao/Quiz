import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTeacherAction } from "../../redux/Action/TeacherAction";
import { fetchCountries, fetchGenders } from "../../redux/Services/Enum";

const AddTeacher = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    // Section 1: Personal Information
    fullName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    permanentAddress: "",
    currentAddress: "",
    nationality: "",
    candidatePhoto: null,
    photoId: null,
    // Section 2: Educational Qualifications
    highestQualification: "",
    institutionsAttended: "",
    degreesCertifications: "",
    subjectSpecialization: "",
    graduationCertificate: null,
    // Section 3: Professional Experience
    employer: "",
    jobTitle: "",
    yearsOfExperience: "",
    experienceCertificate: null,
    // Section 4: Franchise-specific Requirements
    availability: "",
    preferredWorkDays: "",
    preferredWorkTimes: "",
    preferredCountry: "", // Options: "Only India" or "Other than India"
    // Section 5: Legal and Compliance Information (conditional)
    criminalBackgroundCheck: "",
    workAuthorization: null,
    healthMedicalFitness: null,
    nonDisclosureAgreement: null,
    proofOfAddress: null,
    // Section 6: References (conditional)
    professionalReferences: null,
    // Section 7: Resume
    resume: null,
    // Section 8 (Subtitle 9): Signature and Declaration
    applicantSignature: null,
    applicationDate: "",
    declaration: false,
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
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
    let newErrors = {};

    // Section 1: Personal Information validations
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Permanent Address is required";
    if (!formData.currentAddress.trim())
      newErrors.currentAddress = "Current Residential Address is required";
    if (!formData.nationality.trim())
      newErrors.nationality = "Nationality is required";
    if (!formData.candidatePhoto)
      newErrors.candidatePhoto = "Candidate Photo is required";
    if (!formData.photoId) newErrors.photoId = "Photo ID is required";

    // Section 2: Educational Qualifications validations
    if (!formData.highestQualification.trim())
      newErrors.highestQualification = "Highest Qualification is required";
    if (!formData.institutionsAttended.trim())
      newErrors.institutionsAttended = "Institution(s) Attended is required";
    if (!formData.degreesCertifications.trim())
      newErrors.degreesCertifications = "Degrees/Certifications are required";
    if (!formData.subjectSpecialization.trim())
      newErrors.subjectSpecialization = "Subject Specialization is required";
    if (!formData.graduationCertificate)
      newErrors.graduationCertificate = "Graduation Certificate is required";

    // Section 3: Professional Experience validations
    if (!formData.employer.trim())
      newErrors.employer = "Current/Previous Employer is required";
    if (!formData.jobTitle.trim())
      newErrors.jobTitle = "Job Title is required";
    if (!formData.yearsOfExperience.match(/^\d+$/))
      newErrors.yearsOfExperience = "Years of Experience must be a number";
    if (!formData.experienceCertificate)
      newErrors.experienceCertificate = "Experience Certificate is required";

    // Section 4: Franchise-specific Requirements validations
    if (!formData.availability)
      newErrors.availability = "Availability is required";
    if (!formData.preferredWorkDays.trim())
      newErrors.preferredWorkDays = "Preferred Work Days is required";
    if (!formData.preferredWorkTimes.trim())
      newErrors.preferredWorkTimes = "Preferred Work Times is required";
    if (!formData.preferredCountry)
      newErrors.preferredCountry = "Preferred Country selection is required";

    // If "Other than India" is selected, validate additional fields.
    if (formData.preferredCountry === "Other than India") {
      if (!formData.criminalBackgroundCheck)
        newErrors.criminalBackgroundCheck = "Criminal Background Check status is required";
      if (!formData.workAuthorization)
        newErrors.workAuthorization = "Work Authorization is required";
      if (!formData.healthMedicalFitness)
        newErrors.healthMedicalFitness = "Health and Medical Fitness is required";
      if (!formData.proofOfAddress)
        newErrors.proofOfAddress = "Proof of Address is required";
      if (!formData.professionalReferences)
        newErrors.professionalReferences = "Professional References are required";
    }

    // Section 7: Resume validation
    if (!formData.resume) newErrors.resume = "Resume is required";

    // Section 8 (Subtitle 9): Signature and Declaration validations
    if (!formData.applicantSignature)
      newErrors.applicantSignature = "Signature is required";
    if (!formData.applicationDate)
      newErrors.applicationDate = "Application Date is required";
    if (!formData.declaration)
      newErrors.declaration = "You must acknowledge that all provided information is truthful and correct";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("Submitting Data:", formData);
      await dispatch(addTeacherAction(formData));
      toast.success("Teacher added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add teacher!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Teacher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Section 1: Personal Information */}
          <h4>Personal Information</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  isInvalid={!!errors.fullName}
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
                  onChange={handleChange}
                  isInvalid={!!errors.dob}
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
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
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
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="permanentAddress">
                <Form.Label>Permanent Address</Form.Label>
                <Form.Control
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  isInvalid={!!errors.permanentAddress}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.permanentAddress}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="currentAddress">
                <Form.Label>Current Residential Address</Form.Label>
                <Form.Control
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  isInvalid={!!errors.currentAddress}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.currentAddress}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  isInvalid={!!errors.nationality}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nationality}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="candidatePhoto">
                <Form.Label>Candidate Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="candidatePhoto"
                  onChange={handleFileChange}
                  isInvalid={!!errors.candidatePhoto}
                  accept="image/*"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.candidatePhoto}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="photoId">
                <Form.Label>Photo ID</Form.Label>
                <Form.Control
                  type="file"
                  name="photoId"
                  onChange={handleFileChange}
                  isInvalid={!!errors.photoId}
                  accept="image/*"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.photoId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Section 2: Educational Qualifications */}
          <h4>Educational Qualifications</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="highestQualification">
                <Form.Label>Highest Level of Qualification</Form.Label>
                <Form.Control
                  type="text"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  isInvalid={!!errors.highestQualification}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.highestQualification}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="institutionsAttended">
                <Form.Label>Institution(s) Attended</Form.Label>
                <Form.Control
                  type="text"
                  name="institutionsAttended"
                  value={formData.institutionsAttended}
                  onChange={handleChange}
                  isInvalid={!!errors.institutionsAttended}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.institutionsAttended}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="degreesCertifications">
                <Form.Label>Degrees/Certifications</Form.Label>
                <Form.Control
                  type="text"
                  name="degreesCertifications"
                  value={formData.degreesCertifications}
                  onChange={handleChange}
                  isInvalid={!!errors.degreesCertifications}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.degreesCertifications}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="subjectSpecialization">
                <Form.Label>Subject Specialization</Form.Label>
                <Form.Control
                  type="text"
                  name="subjectSpecialization"
                  value={formData.subjectSpecialization}
                  onChange={handleChange}
                  isInvalid={!!errors.subjectSpecialization}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subjectSpecialization}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="graduationCertificate">
                <Form.Label>Graduation Certificate (Upload)</Form.Label>
                <Form.Control
                  type="file"
                  name="graduationCertificate"
                  onChange={handleFileChange}
                  isInvalid={!!errors.graduationCertificate}
                  accept="image/*"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.graduationCertificate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Section 3: Professional Experience */}
          <h4>Professional Experience</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="employer">
                <Form.Label>Current/Previous Employer</Form.Label>
                <Form.Control
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleChange}
                  isInvalid={!!errors.employer}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.employer}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="jobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  isInvalid={!!errors.jobTitle}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.jobTitle}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="yearsOfExperience">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  isInvalid={!!errors.yearsOfExperience}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.yearsOfExperience}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="experienceCertificate">
                <Form.Label>Experience Certificate (Upload)</Form.Label>
                <Form.Control
                  type="file"
                  name="experienceCertificate"
                  onChange={handleFileChange}
                  isInvalid={!!errors.experienceCertificate}
                  accept="image/*"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.experienceCertificate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Section 4: Franchise-specific Requirements */}
          <h4>Franchise-specific Requirements</h4>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="availability">
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
                  <option value="Temporary">Temporary</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.availability}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="preferredWorkDays">
                <Form.Label>Preferred Work Days</Form.Label>
                <Form.Control
                  type="text"
                  name="preferredWorkDays"
                  value={formData.preferredWorkDays}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredWorkDays}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.preferredWorkDays}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="preferredWorkTimes">
                <Form.Label>Preferred Work Times</Form.Label>
                <Form.Control
                  type="text"
                  name="preferredWorkTimes"
                  value={formData.preferredWorkTimes}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredWorkTimes}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.preferredWorkTimes}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="preferredCountry">
                <Form.Label>Preferred Country</Form.Label>
                <Form.Select
                  name="preferredCountry"
                  value={formData.preferredCountry}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredCountry}
                >
                  <option value="">Select Preferred Country</option>
                  <option value="Only India">Only India</option>
                  <option value="Other than India">Other than India</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.preferredCountry}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Conditionally render Sections 5 and 6 if Preferred Country is "Other than India" */}
          {formData.preferredCountry === "Other than India" && (
            <>
              {/* Section 5: Legal and Compliance Information */}
              <h4>Legal and Compliance Information</h4>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="criminalBackgroundCheck">
                    <Form.Label>Criminal Background Check</Form.Label>
                    <Form.Select
                      name="criminalBackgroundCheck"
                      value={formData.criminalBackgroundCheck}
                      onChange={handleChange}
                      isInvalid={!!errors.criminalBackgroundCheck}
                    >
                      <option value="">Select Status</option>
                      <option value="Done">Done</option>
                      <option value="Not Done">Not Done</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.criminalBackgroundCheck}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="workAuthorization">
                    <Form.Label>Work Authorization (Upload)</Form.Label>
                    <Form.Control
                      type="file"
                      name="workAuthorization"
                      onChange={handleFileChange}
                      isInvalid={!!errors.workAuthorization}
                      accept="image/*"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.workAuthorization}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="healthMedicalFitness">
                    <Form.Label>Health and Medical Fitness (Upload)</Form.Label>
                    <Form.Control
                      type="file"
                      name="healthMedicalFitness"
                      onChange={handleFileChange}
                      isInvalid={!!errors.healthMedicalFitness}
                      accept="image/*"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.healthMedicalFitness}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="nonDisclosureAgreement">
                    <Form.Label>Non-disclosure Agreement (Upload, if applicable)</Form.Label>
                    <Form.Control
                      type="file"
                      name="nonDisclosureAgreement"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="proofOfAddress">
                    <Form.Label>Proof of Address (Upload)</Form.Label>
                    <Form.Control
                      type="file"
                      name="proofOfAddress"
                      onChange={handleFileChange}
                      isInvalid={!!errors.proofOfAddress}
                      accept="image/*"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.proofOfAddress}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Section 6: References */}
              <h4>References</h4>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="professionalReferences">
                    <Form.Label>Professional References (Upload)</Form.Label>
                    <Form.Control
                      type="file"
                      name="professionalReferences"
                      onChange={handleFileChange}
                      isInvalid={!!errors.professionalReferences}
                      accept="image/*"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.professionalReferences}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {/* Section 7: Resume */}
          <h4>Resume</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="resume">
                <Form.Label>Upload Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  isInvalid={!!errors.resume}
                  accept="application/pdf, image/*"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.resume}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Section 8 (Subtitle 9): Signature and Declaration */}
          <h4>Signature and Declaration</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="applicantSignature">
                <Form.Label>Signature of Applicant (Upload)</Form.Label>
                <Form.Control
                  type="file"
                  name="applicantSignature"
                  onChange={handleFileChange}
                  isInvalid={!!errors.applicantSignature}
                  accept="image/*"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.applicantSignature}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="applicationDate">
                <Form.Label>Date of Application</Form.Label>
                <Form.Control
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleChange}
                  isInvalid={!!errors.applicationDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.applicationDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="declaration">
                <Form.Check
                  type="checkbox"
                  name="declaration"
                  label="I acknowledge that all provided information is truthful and correct."
                  checked={formData.declaration}
                  onChange={handleChange}
                  isInvalid={!!errors.declaration}
                  feedback={errors.declaration}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTeacher;
