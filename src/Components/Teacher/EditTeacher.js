import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { fetchCountries, fetchGenders, fetchTeacherMode, fetchAvailability, fetchDocumentType } from "../../redux/Services/Enum";
import { editTeacherAction } from "../../redux/Action/TeacherAction";

const EditTeacher = ({ show, onclose  }) => {
  const state = useSelector((state) => state);


   const { selectedTeacher } = useSelector((state) => state.teachers);
    const dispatch = useDispatch();    
    const [genders, setGenders] = useState([]);
    const [countries, setCountries] = useState([]);
    const [teachingModes, setTeachingModes] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);
    
    const [formData, setFormData] = useState({
      firstName: "",
      email: "",
      mobileNumber: "",
      dateOfBirth:"",
      gender: "",
      nationalityId: "",
      highestQualification: "",
      institution: "",
      specialization: "",
      graduationYear: "",
      employer: "",
      jobTitle: "",
      experienceYears: "",
      experienceCertificate: null,
      availability: "",
      workDays: "",
      workTimes: "",
      preferredCountry: "Only India",
      resume: null,
    });

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
            mobileNumber: selectedTeacher.data.phoneNumber || "",
            gender: selectedTeacher.data.gender || "",
            dateOfBirth:selectedTeacher.data.dob.split("T")[0] || "" ,
            permanentAddress:selectedTeacher.data.permanentAddress || "",
            nationalityId: selectedTeacher.data.nationalityId || "",
            documentType: "",
            documentNumber: "", // No documentNumber in response
            photo: null, // No direct photo field, might be in teacherDocumentFileModels
          
            // Educational Qualifications
            highestQualification: selectedTeacher.data.educationQualificationModel?.higherLevelEducation || "",
            institution: selectedTeacher.data.educationQualificationModel?.institute || "",
            specialization: selectedTeacher.data.educationQualificationModel?.subjectSpecialist || "",
            graduationYear: selectedTeacher.data.educationQualificationModel?.yearOfGraduation || "",
          
            // Professional Experience
            employer: selectedTeacher.data.professionalExperianceModel?.employerName || "",
            jobTitle: selectedTeacher.data.professionalExperianceModel?.jobTitle || "",
            experienceYears: selectedTeacher.data.professionalExperianceModel?.yoe || "",
            experienceCertificate: null, // No experienceCertificate in response
          
            // Franchise-specific Requirements
            availability: selectedTeacher.data.availabilityName || "",
            preferredWorkDays: "", // No preferredWorkDays field in response
            preferredWorkTimes: "", // No preferredWorkTimes field in response
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
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = new FormData();
        Object.keys(formData).forEach(key => {
            updatedData.append(key, formData[key]);
        });
        dispatch(editTeacherAction(updatedData));
        onclose();
    };

    return (
        <Modal show={show} onHide={onclose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={formData.fullName} onChange={handleChange} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
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
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
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
                        <Form.Control type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Institution(s) Attended</Form.Label>
                        <Form.Control type="text" name="institution" value={formData.institution} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Subject Specialization</Form.Label>
                        <Form.Control type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year of Graduation</Form.Label>
                        <Form.Control type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange} required />
                    </Form.Group>
                    
                    {/* Professional Experience */}
                    <Form.Group>
                        <Form.Label>Current/Previous Employer</Form.Label>
                        <Form.Control type="text" name="employer" value={formData.employer} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Years of Experience</Form.Label>
                        <Form.Control type="text" name="experienceYears" value={formData.experienceYears} onChange={handleChange} />
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
                        <Form.Control type="text" name="workDays" value={formData.workDays} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preferred Work Times</Form.Label>
                        <Form.Control type="text" name="workTimes" value={formData.workTimes} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preferred Country</Form.Label>
                        <Form.Select name="preferredCountry" value={formData.preferredCountry} onChange={handleChange}>
                            <option>Only India</option>
                        </Form.Select>
                    </Form.Group>
                    
                    {/* Resume Upload */}
                    <Form.Group>
                        <Form.Label>Upload Resume</Form.Label>
                        <Form.Control type="file" name="resume" onChange={handleFileChange} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">Update Teacher</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditTeacher;