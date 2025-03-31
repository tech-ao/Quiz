import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTeacherAction, getTeachers } from "../../redux/Action/TeacherAction";
import { fetchCountries, fetchGenders, fetchTeacherMode, fetchAvailability } from "../../redux/Services/Enum";
import { addTeacher } from "../../redux/Services/Teacher.js"
import InputMask from "react-input-mask";
import BASE_URL from "../../redux/Services/Config.js";

const AddTeacher = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    teacherId: 0,
    fullName: "",
    dob: "",
    gender: null,
    phoneNumber: "",
    email: "",
    statusId: 1,
    permanentAddress: "",
    teacherModeId: "",
    currentResidentialAddress: "",
    nationalityId: null,
    availabilityId: null,
    registerNo: "",
    preferedCountryId: null,
    professionalExperianceModel: {
      employerName: "",
      jobTitle: "",
      yoe: "",
    },
    educationQualificationModel: {
      higherLevelEducation: "",
      institute: "",
      subjectSpecialist: "",
      yearOfGraduation: "",
    },
    complianceInformationModel: {
      isCriminalBackgroundCheck: false,
    },
    teacherDocumentFileModels: [],
    createdBy: 0,
    preferedWorkScheduledName: "",
    preferredWorkTimes: "",
    applicationDate: "",
    declaration: false,
  });
  console.log(formData);


  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [teachingModes, setTeachingMode] = useState([]);
  const [genders, setGenders] = useState([]);
  const [availabilitys, setAvailability] = useState([]);
  const [documentTypes, setDocumentTypes] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(countries);


  const [paginationDetail, setPaginationDetail] = useState({
    pageNumber: 1,
    pageSize: 15,
  });

  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const startYear = 1970; // Adjust as needed
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox"
        ? checked
        : ["country", "grade", "gender", "studyModeId", "teacherModeId"].includes(name)
          ? parseInt(value, 10)
          : value,
    }));
  };



  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
  
    if (file) {
      const fileSize = file.size; // File size in bytes
      const fileType = file.type; // MIME type (e.g., "image/png", "application/pdf")
      const fileExtension = file.name.split(".").pop().toLowerCase(); // File extension
  
      // File validation
      if (fileType.startsWith("image/") && fileSize > 100 * 1024) {
        toast.error("Image file size must be less than 100KB!");
        e.target.value = ""; // Reset file input
        return;
      } else if (fileType === "application/pdf" && fileSize > 2 * 1024 * 1024) {
        toast.error("PDF file size must be less than 2MB!");
        e.target.value = ""; // Reset file input
        return;
      }
  
      // Proceed with file processing
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Content = reader.result.split(",")[1];
        const documentTypeId = documentTypes[name] || null;
  
        if (documentTypeId !== null) {
          setFormData((prevData) => {
            const updatedDocuments = prevData.teacherDocumentFileModels.filter(
              (doc) => doc.documentTypeId !== documentTypeId
            );
            return {
              ...prevData,
              teacherDocumentFileModels: [
                ...updatedDocuments,
                {
                  documentTypeId,
                  name: file.name,
                  extension: fileExtension,
                  base64Content,
                },
              ],
            };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);

        const gendersData = await fetchGenders();
        setGenders(gendersData);

        const teachingModesData = await fetchTeacherMode()
        setTeachingMode(teachingModesData)

        const availabilityData = await fetchAvailability()
        setAvailability(availabilityData)


        const documentTypesData = await fetchDocumentTypes();
        setDocumentTypes(documentTypesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/Enum/DocumentType`,
        {
          headers: {
            accept: "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          },
        }
      );
      const data = await response.json();
      return data.reduce((acc, item) => {
        acc[item.item2] = item.item1;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error fetching document types:", error);
      return {};
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Permanent Address is required";
    if (!formData.currentResidentialAddress.trim())
      newErrors.currentResidentialAddress =
        "Current Residential Address is required";
    if (formData.nationalityId === null)
      newErrors.nationalityId = "Nationality is required";
    if (formData.teacherDocumentFileModels.length === 0)
      newErrors.teacherDocumentFileModels = "At least one document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm()

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        teacherDocumentFileModels: formData.teacherDocumentFileModels.map((doc) => ({
          ...doc,
          base64Content: doc.base64Content,
        })),
      };

      const response = await (addTeacher(payload));
      if (response?.isSuccess) {
        dispatch(getTeachers({ paginationDetail }));
        toast.success("Teacher added successfully!");
        onClose();

      } else {
        toast.error(response?.message || "Failed to add teacher!");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(error.message || "Failed to add teacher!");
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
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
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
            <Form.Group as={Col} className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Row>
                {genders.map((gender, index) => (
                  <Col key={index} md={4}>
                    <Form.Check
                      type="radio"
                      label={gender.item2}
                      name="gender"
                      value={gender.item1}
                      checked={formData.gender === gender.item1}
                      onChange={handleChange}
                      inline
                      required
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
            <Col md={6}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <InputMask
                  mask="9999999999" // Change this format as needed
                  value={formData.phoneNumber}
                  onChange={handleChange}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      type="text"
                      name="phoneNumber"
                      isInvalid={!!errors.phoneNumber}
                    />
                  )}
                </InputMask>
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
              <Form.Group controlId="currentResidentialAddress">
                <Form.Label>Current Residential Address</Form.Label>
                <Form.Control
                  type="text"
                  name="currentResidentialAddress"
                  value={formData.currentResidentialAddress}
                  onChange={handleChange}
                  isInvalid={!!errors.currentResidentialAddress}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.currentResidentialAddress}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="nationalityId">
                <Form.Label>Nationality</Form.Label>
                <Form.Select
                  name="nationalityId"
                  value={formData.nationalityId}
                  onChange={handleChange}
                  isInvalid={!!errors.nationalityId}
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
              <Form.Group controlId="candidatePhoto">
                <Form.Label>Candidate Photo</Form.Label>
                <p style={{ color: "#f55050" }}>Image size less than 100 KB</p>

                <Form.Control
                  type="file"
                  name="Profile Photo"
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
                <p style={{ color: "#f55050" }}>Image size less than 100 KB</p>

                <Form.Control
                  type="file"
                  name="Profile Photo"
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
              <Form.Group controlId="higherLevelEducation">
                <Form.Label>Highest Level of Qualification</Form.Label>
                <Form.Control
                  type="text"
                  name="higherLevelEducation"
                  value={
                    formData.educationQualificationModel.higherLevelEducation
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationQualificationModel: {
                        ...formData.educationQualificationModel,
                        higherLevelEducation: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="institute">
                <Form.Label>Institution(s) Attended</Form.Label>
                <Form.Control
                  type="text"
                  name="institute"
                  value={formData.educationQualificationModel.institute}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationQualificationModel: {
                        ...formData.educationQualificationModel,
                        institute: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="subjectSpecialist">
                <Form.Label>Subject Specialization</Form.Label>
                <Form.Control
                  type="text"
                  name="subjectSpecialist"
                  value={formData.educationQualificationModel.subjectSpecialist}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationQualificationModel: {
                        ...formData.educationQualificationModel,
                        subjectSpecialist: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="yearOfGraduation">
                <Form.Label>Year of Graduation</Form.Label>
                <Form.Control
                  as="select"
                  name="yearOfGraduation"
                  value={formData.educationQualificationModel.yearOfGraduation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationQualificationModel: {
                        ...formData.educationQualificationModel,
                        yearOfGraduation: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Section 3: Professional Experience */}
          <h4>Professional Experience</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="employerName">
                <Form.Label>Current/Previous Employer</Form.Label>
                <Form.Control
                  type="text"
                  name="employerName"
                  value={formData.professionalExperianceModel.employerName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalExperianceModel: {
                        ...formData.professionalExperianceModel,
                        employerName: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="jobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="jobTitle"
                  value={formData.professionalExperianceModel.jobTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalExperianceModel: {
                        ...formData.professionalExperianceModel,
                        jobTitle: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="yoe">
                <Form.Label>Years of Experience</Form.Label>
                <p></p>
                <Form.Control
                  type="number"
                  name="yoe"
                  value={formData.professionalExperianceModel.yoe}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalExperianceModel: {
                        ...formData.professionalExperianceModel,
                        yoe: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="experienceCertificate">
                <Form.Label>Experience Certificate (Upload)</Form.Label>
                <p style={{ color: "#f55050" }}>Pdf size less than 2mb</p>

                <Form.Control
                  type="file"
                  name="Professional Year Of Experiance"
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Section 4: Franchise-specific Requirements */}
          <h4>Franchise-specific Requirements</h4>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="availabilityId">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  name="availabilityId"
                  value={formData.availabilityId}
                  onChange={handleChange}
                  isInvalid={!!errors.availability}
                >
                  <option value="">Select Availability</option>
                  {availabilitys.map((availability, index) => (
                    <option key={index} value={availability.item1}>
                      {availability.item2}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.availabilityId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="preferedWorkScheduledName">
                <Form.Label>Preferred Work Days</Form.Label>
                <Form.Control
                  type="text"
                  name="preferedWorkScheduledName"
                  value={formData.preferedWorkScheduledName}
                  onChange={handleChange}
                />
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
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="preferedCountryId">
                <Form.Label>Preferred Country</Form.Label>
                <Form.Select
                  name="preferedCountryId"
                  value={formData.preferedCountryId}
                  onChange={handleChange}
                >
                  <option value="">Select Preferred Country</option>
                  <option value="1">Only India</option>
                  <option value="2">Other than India</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Form.Group as={Col} className="mb-3" controlId="formClassMode">
              <Form.Label>Teaching Mode</Form.Label>
              <Row>
                {teachingModes.map((mode, index) => (
                  <Col key={index} md={4}>
                    <Form.Check
                      type="radio"
                      label={mode.item2}
                      name="teacherModeId"
                      value={mode.item1}
                      checked={formData.teacherModeId === mode.item1}
                      onChange={handleChange} // Calls handleChange on selection
                      inline
                      required
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>


          </Row>

          {formData.preferedCountryId == 2 && (
            <>
              <h4>Legal and Compliance Information</h4>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="isCriminalBackgroundCheck">
                    <Form.Label>Criminal Background Check</Form.Label>
                    <Form.Select
                      name="isCriminalBackgroundCheck"
                      value={
                        formData.complianceInformationModel
                          .isCriminalBackgroundCheck
                          ? "true"
                          : "false"
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          complianceInformationModel: {
                            ...formData.complianceInformationModel,
                            isCriminalBackgroundCheck:
                              e.target.value === "true",
                          },
                        })
                      }
                    >
                      <option value="false">Not Done</option>
                      <option value="true">Done</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="workAuthorization">
                    <Form.Label>Work Authorization (Upload)</Form.Label>
                    <p style={{ color: "#f55050" }}>Pdf size less than 2mb</p>

                    <Form.Control
                      type="file"
                      name="workAuthorization"
                      onChange={handleFileChange}
                      accept="application/pdf"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="healthMedicalFitness">
                    <Form.Label>Health and Medical Fitness (Upload)</Form.Label>
                    <p style={{ color: "#f55050" }}>Pdf size less than 2mb</p>

                    <Form.Control
                      type="file"
                      name="healthMedicalFitness"
                      onChange={handleFileChange}
                      accept="application/pdf"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="proofOfAddress">
                    <Form.Label>Proof of Address (Upload)</Form.Label>
                    <p style={{ color: "#f55050" }}>Image size less than 100Kb & Pdf less than 2mb</p>
                    <Form.Control
                      type="file"
                      name="proofOfAddress"
                      onChange={handleFileChange}
                      accept="application/pdf, image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <h4>Resume</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="resume">
                <Form.Label>Upload Resume</Form.Label>
                <p style={{ color: "#f55050" }}>Pdf size less than 2mb</p>

                <Form.Control
                  type="file"
                  name="Resume"
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
              </Form.Group>
            </Col>
          </Row>

          <h4>Signature and Declaration</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="applicantSignature">
                <Form.Label>Signature of Applicant (Upload)</Form.Label>
                <p style={{ color: "#f55050" }}>pdf size less than 2mb</p>

                <Form.Control
                  type="file"
                  name="Signature"
                  onChange={handleFileChange}
                  accept="application/pdf , image/*"
                />
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
                  required
                  min={new Date().toISOString().split("T")[0]} // Prevents past dates
                  max={new Date().toISOString().split("T")[0]} // Prevents future dates
                />
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
