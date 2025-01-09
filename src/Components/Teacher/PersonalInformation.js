import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { fetchGenders, fetchCountries, fetchDocumentType } from "../../redux/Services/Enum";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTeacherAction } from "../../redux/Action/TeacherAction";

const PersonalInformationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    permanentAddress: "",
    currentResidentialAddress: "",
    nationalityId: "",
  });

  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [teacherDocumentFileModels, setTeacherDocumentFileModels] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  // Fetch enums for dropdowns
  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const genderData = await fetchGenders();
        setGenders(genderData);
        const countryData = await fetchCountries();
        setCountries(countryData);
        const documentTypeData = await fetchDocumentType();
        setDocumentType(documentTypeData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchEnums();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads
  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const base64Content = await convertToBase64(file);
      const documentTypeId =
        name === "photo"
          ? documentType.find((doc) => doc.item2 === "Candidate Photo")?.item1
          : documentType.find((doc) => doc.item2 === "Photo ID")?.item1;

      const fileModel = {
        teacherDocumentFileId: 0,
        teacherId: 0,
        documentTypeId,
        extension: file.name.split(".").pop(),
        name: file.name,
        base64Content,
      };

      setTeacherDocumentFileModels((prev) => [
        ...prev.filter((doc) => doc.documentTypeId !== documentTypeId),
        fileModel,
      ]);

      setFormData({ ...formData, [name]: file });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Phone Number must be 10 digits.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid Email Address.";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Permanent Address is required.";
    if (!formData.currentResidentialAddress.trim())
      newErrors.currentResidentialAddress =
        "Current Residential Address is required.";
    if (!formData.nationalityId)
      newErrors.nationalityId = "Nationality is required.";
    if (!formData.photo) newErrors.photo = "Candidate Photo is required.";
    if (!formData.photoID) newErrors.photoID = "Photo ID is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saved Data:", { ...formData, teacherDocumentFileModels });
      toast.success("Form saved successfully!");
    } else {
      toast.error("Please fix the errors before saving.");
    }
  };

  const handleNext = async () => {
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        await dispatch(addTeacherAction({ ...formData, teacherDocumentFileModels }));
        toast.success("Personal Information submitted!");
      } catch (error) {
        toast.error("Submission failed!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container>
      <h4 className="mb-4">Personal Information</h4>
      <Form>
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
              >
                <option value="">Select Gender</option>
                {genders.map((gender) => (
                  <option key={gender.item1} value={gender.item1}>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nationalityId">
              <Form.Label>Nationality</Form.Label>
              <Form.Select
                name="nationalityId"
                value={formData.nationalityId}
                onChange={handleInputChange}
                isInvalid={!!errors.nationalityId}
              >
                <option value="">Select Nationality</option>
                {countries.map((country) => (
                  <option key={country.item1} value={country.item1}>
                    {country.item2}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.nationalityId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="permanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                isInvalid={!!errors.permanentAddress}
              />
              <Form.Control.Feedback type="invalid">
                {errors.permanentAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="currentResidentialAddress">
              <Form.Label>Current Residential Address</Form.Label>
              <Form.Control
                type="text"
                name="currentResidentialAddress"
                value={formData.currentResidentialAddress}
                onChange={handleInputChange}
                isInvalid={!!errors.currentResidentialAddress}
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentResidentialAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="photo">
              <Form.Label>Candidate Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleFileChange}
                isInvalid={!!errors.photo}
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
                onChange={handleFileChange}
                isInvalid={!!errors.photoID}
              />
              <Form.Control.Feedback type="invalid">
                {errors.photoID}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" className="mt-4" onClick={handleSave}>
          Save
        </Button>
        <Button variant="success" className="mt-4 ms-3" onClick={handleNext}>
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default PersonalInformationForm;
