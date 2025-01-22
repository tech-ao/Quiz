import React, { useState } from "react";
import { Offcanvas, Button, Form, Row, Col } from "react-bootstrap";

const EditTeacher = ({ show, onClose }) => {
  // State to store form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    address: "",
    countryCode: "+91", // Default country code
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the state for each field
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log the collected form data

    // Perform any action with the form data (e.g., API call, state update)
    console.log("Student added successfully!");

    onClose(); // Close the form after submission
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Student</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formStudentFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formStudentLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formStudentEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Row>
                <Col xs={3}>
                  <Form.Select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (Australia)</option>
                    {/* Add more country codes as needed */}
                  </Form.Select>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Grade</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              {/* Add more grades as needed */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Student
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditTeacher;




// import { Container, Form, Row, Col, Button } from "react-bootstrap";
// import Sidebar from "../Admin/SidePannel";
// import AdminHeader from "../Admin/AdminHeader";
// import { fetchGenders, fetchCountries, fetchDocumentType } from "../../redux/Services/Enum";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { addTeacherAction } from "../../redux/Action/TeacherAction";
// import "./AddTeacher.css";

// const EditTeacher = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     gender: "",
//     phoneNumber: "",
//     email: "",
//     permanentAddress: "",
//     currentResidentialAddress: "",
//     nationalityId: "",
//     photo: null,
//     photoID: null,
//   });

//   const [genders, setGenders] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [documentType, setDocumentType] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchEnums = async () => {
//       try {
//         setGenders(await fetchGenders());
//         setCountries(await fetchCountries());
//         setDocumentType(await fetchDocumentType());
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };
//     fetchEnums();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = async (e) => {
//     const { name, files } = e.target;
//     if (files.length > 0) {
//       setFormData(import React, { useState, useEffect } from "react";{ ...formData, [name]: files[0] });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
//     if (!formData.dob) newErrors.dob = "Date of Birth is required.";
//     if (!formData.gender) newErrors.gender = "Gender is required.";
//     if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = "Phone Number must be 10 digits.";
//     if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid Email Address.";
//     if (!formData.permanentAddress.trim()) newErrors.permanentAddress = "Permanent Address is required.";
//     if (!formData.currentResidentialAddress.trim()) newErrors.currentResidentialAddress = "Current Residential Address is required.";
//     if (!formData.nationalityId) newErrors.nationalityId = "Nationality is required.";
//     if (!formData.photo) newErrors.photo = "Candidate Photo is required.";
//     if (!formData.photoID) newErrors.photoID = "Photo ID is required.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         setIsSubmitting(true);
//         await dispatch(addTeacherAction(formData));
//         toast.success("Teacher added successfully!");
//       } catch (error) {
//         toast.error("Failed to submit form.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   return (
//     <div>
     
//       <div className="d-flex">
//         <Sidebar />
//         <Container
//           className="main-container p-2 d-flex justify-content-center align-items-center"
//           style={{ height: "85vh" }}
//         >
//           <div
//             className="sub-container p-4 bg-white rounded shadow-sm"
//             style={{
//               border: "1px solid #ddd",
//               width: "100%",
//               height: "80vh",
//               overflowY: "auto",
//             }}
//           >
//           <Form onSubmit={handleSubmit}>
//             <h4 className="mb-4">Edit Teacher</h4>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group controlId="fullName">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} isInvalid={!!errors.fullName} />
//                   <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="dob">
//                   <Form.Label>Date of Birth</Form.Label>
//                   <Form.Control type="date" name="dob" value={formData.dob} onChange={handleInputChange} isInvalid={!!errors.dob} />
//                   <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group controlId="gender">
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select name="gender" value={formData.gender} onChange={handleInputChange} isInvalid={!!errors.gender}>
//                     <option value="">Select Gender</option>
//                     {genders.map((gender) => (
//                       <option key={gender.item1} value={gender.item1}>{gender.item2}</option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="phoneNumber">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} isInvalid={!!errors.phoneNumber} />
//                   <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group controlId="email">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} isInvalid={!!errors.email} />
//                   <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="nationalityId">
//                   <Form.Label>Nationality</Form.Label>
//                   <Form.Select name="nationalityId" value={formData.nationalityId} onChange={handleInputChange} isInvalid={!!errors.nationalityId}>
//                     <option value="">Select Nationality</option>
//                     {countries.map((country) => (
//                       <option key={country.item1} value={country.item1}>{country.item2}</option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{errors.nationalityId}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>


           

//             <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="highestEducation">
//               <Form.Label>Highest Level of Education</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="highestEducation"
//                 value={formData.highestEducation}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.highestEducation}
//               />
//               <Form.Control.Feedback type="invalid">{errors.highestEducation}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="institution">
//               <Form.Label>Institution(s) Attended</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="institution"
//                 value={formData.institution}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.institution}
//               />
//               <Form.Control.Feedback type="invalid">{errors.institution}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="degree">
//               <Form.Label>Degrees/Certifications</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="degree"
//                 value={formData.degree}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.degree}
//               />
//               <Form.Control.Feedback type="invalid">{errors.degree}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="specialization">
//               <Form.Label>Subject Specialization</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="specialization"
//                 value={formData.specialization}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.specialization}
//               />
//               <Form.Control.Feedback type="invalid">{errors.specialization}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="graduationYear">
//               <Form.Label>Year of Graduation</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="graduationYear"
//                 value={formData.graduationYear}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.graduationYear}
//               />
//               <Form.Control.Feedback type="invalid">{errors.graduationYear}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
         
//         </Row>

//         <h5 className="mb-3">3. Professional Experience</h5>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="employer">
//               <Form.Label>Current/Previous Employer</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="employer"
//                 value={formData.employer}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.employer}
//               />
//               <Form.Control.Feedback type="invalid">{errors.employer}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="jobTitle">
//               <Form.Label>Job Title(s)</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="jobTitle"
//                 value={formData.jobTitle}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.jobTitle}
//               />
//               <Form.Control.Feedback type="invalid">{errors.jobTitle}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="experienceYears">
//               <Form.Label>Years of Experience</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="experienceYears"
//                 value={formData.experienceYears}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.experienceYears}
//               />
//               <Form.Control.Feedback type="invalid">{errors.experienceYears}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
          
//         </Row>

//         <Row className="mb-4">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label className="fw-bold">Availability</Form.Label>
//               <div>
//                 {['Full-time', 'Part-time', 'Temporary'].map((option) => (
//                   <Form.Check
//                     key={option}
//                     type="radio"
//                     name="availability"
//                     label={option}
//                     value={option}
//                     checked={formData.availability === option}
//                     onChange={handleInputChange}
//                     inline
//                   />
//                 ))}
//               </div>
//               {errors.availability && <div className="text-danger">{errors.availability}</div>}
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label className="fw-bold">Preferred Work Schedule</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="workSchedule"
//                 placeholder="Enter preferred days/times"
//                 value={formData.workSchedule}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.workSchedule}
//               />
//               <Form.Control.Feedback type="invalid">{errors.workSchedule}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Row 2: Preferred Country */}
//         <Row className="mb-4">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label className="fw-bold">Preferred Country</Form.Label>
//               <div>
//                 {['India', 'Other'].map((option) => (
//                   <Form.Check
//                     key={option}
//                     type="radio"
//                     name="preferredCountry"
//                     label={option}
//                     value={option}
//                     checked={formData.preferredCountry === option}
//                     onChange={handleInputChange}
//                     inline
//                   />
//                 ))}
//               </div>
//               {errors.preferredCountry && <div className="text-danger">{errors.preferredCountry}</div>}
//             </Form.Group>
//           </Col>
//         </Row>
//          <Row className="mb-3">
//                   <Col sm={6}>
//                     <Form.Group>
//                       <Form.Label>Criminal Background Check</Form.Label>
//                       <Form.Select>
//                         <option value="done">Done</option>
//                         <option value="not-done">Not Done</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
                  
//                 </Row>
        
//                 {/* Row 2: Health and Medical Fitness and NDA */}
               
        
//                 {/* Row 3: Proof of Address */}
                

//               <div className="text-center">
//                 <Button type="submit" variant="success" className="px-5" disabled={isSubmitting}>
//                   {isSubmitting ? "Updating..." : "Update"}
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default EditTeacher;
