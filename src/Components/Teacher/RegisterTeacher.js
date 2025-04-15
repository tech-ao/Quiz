import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addTeacherAction } from "../../redux/Action/TeacherAction";
import "./RegisterTeacher.css";
import RegisterHeader from "../Student/RegisterHeader";
import { fetchCountries, fetchGenders, fetchTeacherMode ,fetchAvailability } from "../../redux/Services/Enum";

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    teacherId: 0,
    fullName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    statusId: 3,
    permanentAddress: "",
    currentResidentialAddress: "",
    nationalityId: null,
    availabilityId: 1,
    registerNo: "",
    preferedCountryId: 1,
    complianceInformationModel: {
      isCriminalBackgroundCheck: false,
    },
    teacherDocumentFileModels: [],
    createdBy: 0,
    preferredWorkDays: "",
    preferredWorkTimes: "",
    applicationDate: "",
    declaration: false,
  });

  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {

       
              const fileSize = file.size; // File size in bytes
              const fileType = file.type; // MIME type (e.g., "image/png", "application/pdf")
              const extension = file.name.split(".").pop().toLowerCase(); // File extension
        
              // Validation: Check file type and size
              if (fileType.startsWith("image/") && fileSize > 100 * 1024) {
                toast.error("Image file size must be less than 100KB!");
                e.target.value = ""; // Reset input field
                return;
              } else if (fileType === "application/pdf" && fileSize > 2 * 1024 * 1024) {
               toast.error("PDF file size must be less than 2MB!");
                e.target.value = ""; // Reset input field
                return;
              }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Content = reader.result.split(",")[1];
        const documentTypeId = getDocumentTypeId(name); // Function to get document type ID based on name

        if (documentTypeId !== null) {
          setFormData((prevData) => ({
            ...prevData,
            teacherDocumentFileModels: [
              ...prevData.teacherDocumentFileModels.filter(doc => doc.documentTypeId !== documentTypeId),
              {
                documentTypeId,
                name: file.name,
                extension: file.name.split(".").pop(),
                base64Content,
              },
            ],
          }));
        } else {
          toast.error(`Invalid document type for ${name}`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getDocumentTypeId = (name) => {
    // Map the input name to the corresponding document type ID
    const documentTypeMap = {
      experienceCertificate: 5,
      teacherResume: 4,
    };
    return documentTypeMap[name] || null;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
        const gendersData = await fetchGenders();
        setGenders(gendersData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        toast.error("Failed to load form data.");
      }
    };

    fetchAllData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Phone Number must be 10 digits.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid Email Address.";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Permanent Address is required.";
    if (!formData.currentResidentialAddress.trim())
      newErrors.currentResidentialAddress = "Current Residential Address is required.";
    if (!formData.teacherDocumentFileModels.length)
      newErrors.teacherDocumentFileModels = "At least one document is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        const response = await dispatch(addTeacherAction(formData)); 
        if (response?.isSuccess) {
          toast.success("Teacher added successfully!");    
                
                  setFormData({
                    fullName: "",
                    dob: "",
                    gender: "",
                    phoneNumber: "",
                    email: "",
                    statusId: 3,
                    permanentAddress: "",
                    currentResidentialAddress: "",
                    nationalityId:"",
                    teacherDocumentFileModels: [],
                    experienceCertificate:null,
                    teacherResume: null
                  });
        } else {
          toast.error(response?.message || "Failed to add teacher!");
        }
      } catch (error) {
        console.error("Error in handleRegister:", error);
        toast.error(error.message || "Failed to add teacher!");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const errorMessages = Object.values(errors).join(", ");
      toast.error(`Please fix the following errors: ${errorMessages}`);
    }
  };

  return (
    <div><RegisterHeader />
     <div className="register-student-page registerbg-image">
    <Container className="register-teacher-container ">
      <h3 className="mb-4">Register Teacher</h3>
      <Form className="reg-form" noValidate onSubmit={handleRegister}>
        {/* Personal Information */}
        <h5 className="mb-3">Personal Information</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Name</Form.Label>
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
                                         required
                                         max={new Date().toISOString().split("T")[0]} // Prevents future dates
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
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                isInvalid={!!errors.phoneNumber}
                  onChange={(e) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value)) {
                      setFormData((prevData) => ({
                        ...prevData,
                        phoneNumber: e.target.value,
                      }));
                    }
                  }}
                  maxLength={10}
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
                required
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
                required
              >
                <option value="">Select Nationality</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.item1}>
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
                required
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
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentResidentialAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Document Uploads */}
        <h5 className="mb-3">Document Uploads</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="experienceCertificate">
              <Form.Label>Experience Certificate</Form.Label>
              <p style={{ color: "#f55050" }}>File size less than 2mb</p>

              <Form.Control
                type="file"
                name="experienceCertificate"
                onChange={handleFileChange}
                accept="image/*, application/pdf"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="teacherResume">
              <Form.Label>Upload Resume</Form.Label>
              <p style={{ color: "#f55050" }}>File size less than 2mb</p>

              <Form.Control
                type="file"
                name="teacherResume"
                onChange={handleFileChange}
                accept="application/pdf, image/*"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </Form>
    </Container>
    </div>
    </div>
  );
};

export default RegisterTeacher;