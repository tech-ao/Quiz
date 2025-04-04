import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { fetchCountries, fetchGenders, fetchTeacherMode, fetchAvailability, fetchDocumentType, fetchPreferedCountry } from "../../redux/Services/Enum";
import { editTeacherAction, getTeachers } from "../../redux/Action/TeacherAction";
import { toast } from "react-toastify";


const EditTeacher = ({ show, onClose }) => {
  const state = useSelector((state) => state);


  const { selectedTeacher } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [teachingModes, setTeachingModes] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    teacherId: null,
    fullName: "",
    dob: "",
    gender: null,
    phoneNumber: "",
    email: "",
    permanentAddress: "",
    teacherModeId: null,
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
    preferedWorkDays: "",
    preferedWorkTime: "",
    applicationDate: "",
    declaration: false,
  });

  console.log(formData);


  useEffect(() => {
    const fetchData = async () => {
      setCountries(await fetchCountries());
      setGenders(await fetchGenders());
      setTeachingModes(await fetchTeacherMode());
      setAvailability(await fetchAvailability());
      setDocumentTypes(await fetchDocumentType());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      setFormData({
        teacherId:selectedTeacher.data.teacherId || null ,
        fullName: selectedTeacher.data.fullName || "",
        dob: selectedTeacher.data.dob ? selectedTeacher.data.dob.split("T")[0] : "",
        gender: selectedTeacher.data.gender || null,
        phoneNumber: selectedTeacher.data.phoneNumber || "",
        email: selectedTeacher.data.email || "",
        permanentAddress: selectedTeacher.data.permanentAddress || "",
        teacherModeId: selectedTeacher.data.teacherModeId || null,
        currentResidentialAddress: selectedTeacher.data.currentResidentialAddress || "",
        nationalityId: selectedTeacher.data.nationalityId || null,
        availabilityId: selectedTeacher.data.availabilityId || null,
        registerNo: selectedTeacher.data.registerNo || "",
        preferedCountryId: selectedTeacher.data.preferedCountryId || null,

        // Professional Experience
        professionalExperianceModel: {
          employerName: selectedTeacher.data.professionalExperianceModel?.employerName || "",
          jobTitle: selectedTeacher.data.professionalExperianceModel?.jobTitle || "",
          yoe: selectedTeacher.data.professionalExperianceModel?.yoe || "",
        },

        // Educational Qualifications
        educationQualificationModel: {
          higherLevelEducation: selectedTeacher.data.educationQualificationModel?.higherLevelEducation || "",
          institute: selectedTeacher.data.educationQualificationModel?.institute || "",
          subjectSpecialist: selectedTeacher.data.educationQualificationModel?.subjectSpecialist || "",
          yearOfGraduation: selectedTeacher.data.educationQualificationModel?.yearOfGraduation || "",
        },

        // Compliance Information
        complianceInformationModel: {
          isCriminalBackgroundCheck: selectedTeacher.data.complianceInformationModel?.isCriminalBackgroundCheck || false,
        },

        // Document Files
        teacherDocumentFileModels: selectedTeacher.data.teacherDocumentFileModels || [],

        // Preferred Work Schedule
        preferedWorkDays: selectedTeacher.data.preferedWorkDays || "",
        preferedWorkTime: selectedTeacher.data.preferedWorkTime || "",

        applicationDate: selectedTeacher.data.applicationDate || "",
        declaration: selectedTeacher.data.declaration || false,
      });
    }
  }, [selectedTeacher]);


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
      console.log(file);

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
                  extension: file.name.split(".").pop(),
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

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const updatedData = new FormData();
  //     Object.keys(formData).forEach(key => {
  //         updatedData.append(key, formData[key]);
  //     });
  //     dispatch(editTeacherAction(updatedData));
  //     onClose();
  // };

  const [paginationDetail, setPaginationDetail] = useState({
    pageNumber: 1,
    pageSize: 15,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(editTeacherAction(formData, selectedTeacher.teacherId));
      dispatch(getTeachers({ paginationDetail }));
      toast.success("Teacher modified successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to modify student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Teacher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <h4>Personal Information</h4>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split("T")[0]} // Prevents future dates
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Row className="mt-2">
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
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Permanent Address</Form.Label>
                <Form.Control as="textarea" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>


          <Row className="md-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nationality</Form.Label>
                <Form.Select name="nationalityId" value={formData.nationalityId} onChange={handleChange} required>
                  <option value="">Select Nationality</option>
                  {countries.map(c => <option key={c.item1} value={c.item1}>{c.item2}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate Photo</Form.Label>
                        <Form.Control type="file" name="photo" onChange={handleFileChange} />
                    </Form.Group>
                    </Col> */}
          </Row>

          <Row className="md-3">
            {/* <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Photo Id</Form.Label>
                        <Form.Control type="file" name="photoId" onChange={handleFileChange} />
                    </Form.Group>
                            </Col> */}

            <h4>Educational Qualifications</h4>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Highest Level of Qualification</Form.Label>
                <Form.Control type="text" name="higherLevelEducation" value={formData.educationQualificationModel?.higherLevelEducation} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>institute(s) Attended</Form.Label>
                <Form.Control type="text" name="institute" value={formData.educationQualificationModel?.institute} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="md-3">

            <Col md={6}>
              <Form.Group>
                <Form.Label>Subject subjectSpecialist</Form.Label>
                <Form.Control type="text" name="subjectSpecialist" value={formData.educationQualificationModel?.subjectSpecialist} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mt-3">
                <Form.Label>Year of Graduation</Form.Label>
                <Form.Control type="text" name="yearOfGraduation" value={formData.educationQualificationModel?.yearOfGraduation} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>



          <h4>Professional Experience</h4>
          <Row className="md-3">

            <Col md={6}>
              <Form.Group className="mt-3">
                <Form.Label>Current/Previous Employer</Form.Label>
                <Form.Control type="text" name="employerName" value={formData.professionalExperianceModel?.employerName} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mt-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" name="jobTitle" value={formData.professionalExperianceModel?.jobTitle} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="md-3">


            <Col md={6}>
              <Form.Group className="mt-3">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control type="text" name="yoe" value={formData.professionalExperianceModel?.yoe} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>


          {/* <Col md={6}>
                    <Form.Group className="mt-3">
                        <Form.Label>Experience Certificate (Upload)</Form.Label>
                        <Form.Control type="file" name="experienceCertificate" onChange={handleFileChange} />
                    </Form.Group>
                    </Col> */}

          <h4>Franchise-specific Requirements</h4>
          <Row className="md-3">
            <Col md={6}>


              <Form.Group className="mt-3">
                <Form.Label>Availability</Form.Label>
                <Form.Select name="availability" value={formData.availability} onChange={handleChange}>
                  {availability.map(a => <option key={a.item1} value={a.item1}>{a.item2}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>


          <Row className="md-3">
            <Col md={6}>
              <Form.Group className="mt-3">
                <Form.Label>Preferred Work Days</Form.Label>
                <Form.Control type="text" name="preferedWorkDays" value={formData.preferedWorkDays} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mt-3">
                <Form.Label>Preferred Work Times</Form.Label>
                <Form.Control type="text" name="preferedWorkTime" value={formData.preferedWorkTime} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="md-3">
            <Col md={6}>
              <Form.Group className="mt-3">
                <Form.Label>Preferred Country</Form.Label>
                <Form.Select name="preferredCountry" value={formData.preferredCountry} onChange={handleChange}>
                  <option>Only India</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Resume Upload */}
            {/* <Col md={6}>
                    <Form.Group className="mt-3 mb-3" >
                        <Form.Label>Upload Resume</Form.Label>
                        <Form.Control type="file" name="resume" onChange={handleFileChange} />
                    </Form.Group>
                    </Col> */}
          </Row>
          <div style={{ marginTop: '10px' }}>

            <Button variant="primary" type="submit">Save Teacher </Button>

          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTeacher;