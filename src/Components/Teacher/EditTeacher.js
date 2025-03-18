import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { fetchCountries, fetchGenders, fetchTeacherMode, fetchAvailability, fetchDocumentType } from "../../redux/Services/Enum";
import { editTeacherAction, getTeachers } from "../../redux/Action/TeacherAction";
import { toast } from "react-toastify";


const EditTeacher = ({ show, onClose  }) => {
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
        fullName: "",
        dob: "",
        gender: null,
        phoneNumber: "",
        email: "",
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
        preferedWorkScheduledName: "",
        preferredWorkTimes: "",
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
            fullName: selectedTeacher.data.fullName || "",
            lastName: "", // No last name field in the response, adjust accordingly
            email: selectedTeacher.data.email || "",
            phoneNumber: selectedTeacher.data.phoneNumber || "",
            gender: selectedTeacher.data.gender || "",
            dob:selectedTeacher.data.dob.split("T")[0] || "" ,
            permanentAddress:selectedTeacher.data.permanentAddress || "",
            nationalityId: selectedTeacher.data.nationalityId || "",
            documentType: "",
            documentNumber: "", // No documentNumber in response
            photo: null, // No direct photo field, might be in teacherDocumentFileModels
          
            // Educational Qualifications
            higherLevelEducation: selectedTeacher.data.educationQualificationModel?.higherLevelEducation || "",
            institute: selectedTeacher.data.educationQualificationModel?.institute || "",
            subjectSpecialist: selectedTeacher.data.educationQualificationModel?.subjectSpecialist || "",
            yearOfGraduation: selectedTeacher.data.educationQualificationModel?.yearOfGraduation || "",
          
            // Professional Experience
            employerName: selectedTeacher.data.professionalExperianceModel?.employerName || "",
            jobTitle: selectedTeacher.data.professionalExperianceModel?.jobTitle || "",
            yoe: selectedTeacher.data.professionalExperianceModel?.yoe || "",
            experienceCertificate: null, // No experienceCertificate in response
          
            // Franchise-specific Requirements
            availability: selectedTeacher.data.availabilityName || "",
            preferredWorkDays: selectedTeacher.data.availabilityName || "", // No preferredWorkDays field in response
            preferredWorkTimes: selectedTeacher.data.preferredWorkTimes|| "", // No preferredWorkTimes field in response
            preferredCountry: selectedTeacher.data.preferedCountryName || "",
          
            // Resume Upload
            resume: null, // No direct resume field in response
          });
      }
  }, [selectedTeacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
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
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>permanentAddress</Form.Label>
                        <Form.Control type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
                    </Form.Group>

                    
                   
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Select name="nationalityId" value={formData.nationalityId} onChange={handleChange} required>
                            <option value="">Select Nationality</option>
                            {countries.map(c => <option key={c.item1} value={c.item1}>{c.item2}</option>)}
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate Photo</Form.Label>
                        <Form.Control type="file" name="photo" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Photo Id</Form.Label>
                        <Form.Control type="file" name="photoId" onChange={handleFileChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Highest Level of Qualification</Form.Label>
                        <Form.Control type="text" name="higherLevelEducation" value={formData.higherLevelEducation} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>institute(s) Attended</Form.Label>
                        <Form.Control type="text" name="institute" value={formData.institute} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Subject subjectSpecialist</Form.Label>
                        <Form.Control type="text" name="subjectSpecialist" value={formData.subjectSpecialist} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year of Graduation</Form.Label>
                        <Form.Control type="text" name="yearOfGraduation" value={formData.yearOfGraduation} onChange={handleChange} required />
                    </Form.Group>
                    
                    {/* Professional Experience */}
                    <Form.Group>
                        <Form.Label>Current/Previous Employer</Form.Label>
                        <Form.Control type="text" name="employerName" value={formData.employerName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Years of Experience</Form.Label>
                        <Form.Control type="text" name="yoe" value={formData.yoe} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Experience Certificate (Upload)</Form.Label>
                        <Form.Control type="file" name="experienceCertificate" onChange={handleFileChange} />
                    </Form.Group>
                    
                    {/* Franchise-specific Requirements */}
                    <Form.Group>
                        <Form.Label>Availability</Form.Label>
                        <Form.Select name="availability" value={formData.availability} onChange={handleChange}>
                            {availability.map(a => <option key={a.item1} value={a.item1}>{a.item2}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preferred Work Days</Form.Label>
                        <Form.Control type="text" name="preferredWorkDays" value={formData.preferredWorkDays} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preferred Work Times</Form.Label>
                        <Form.Control type="text" name="preferredWorkTimes" value={formData.preferredWorkTimes} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preferred Country</Form.Label>
                        <Form.Select name="preferredCountry" value={formData.preferredCountry} onChange={handleChange}>
                            <option>Only India</option>
                        </Form.Select>
                    </Form.Group>
                    
                    {/* Resume Upload */}
                    <Form.Group className="mb-3" >
                        <Form.Label>Upload Resume</Form.Label>
                        <Form.Control type="file" name="resume" onChange={handleFileChange} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">Save Teacher </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditTeacher;