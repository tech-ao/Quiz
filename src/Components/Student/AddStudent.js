import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { addStudentAction, getStudents } from "../../redux/Action/StudentAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCountries, fetchGrades, fetchGenders, fetchStudentMode } from "../../redux/Services/Enum";

const AddStudentPanel = ({ show, onClose }) => {
  const [countries, setCountries] = useState([]);
  const [grades, setGrades] = useState([]);
  const [genders, setGenders] = useState([]);
  const [classModes, setClassModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [birthCertificatePreview, setBirthCertificatePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    parentName: "",
    phoneNumber: "",
    dob: "",
    grade: null,
    address: "",
    gender: null,
    studyModeId: null,
    country: null,
    centreName: "",       // New field: Centre Name
    centrePlace: "",      // New field: Place
    joiningDate: "",      // New field: Joining Date
    currentLevel: "",     // New field: Current Level
    completedLevel: "",   // New field: Completed Level
    statusId: 1,
    createdBy: 1,
    profile: {
      name: "",
      extension: "",
      base64Content: "",
    },
    birthCertificate: {
      name: "",
      extension: "",
      base64Content: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Content = reader.result.split(",")[1];
          const extension = file.name.split(".").pop();

          const field = name === "profile" ? "profile" : "birthCertificate";

          setFormData((prevData) => ({
            ...prevData,
            [field]: {
              name: file.name,
              extension: extension,
              base64Content: base64Content,
            },
          }));
        };
        reader.readAsDataURL(file);
        const previewURL = URL.createObjectURL(file);

        if (name === "profile") {
          setPreview(previewURL);
        } else if (name === "birthCertificate") {
          setBirthCertificatePreview(previewURL);
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: ["country", "grade", "gender", "studyModeId"].includes(name)
          ? parseInt(value, 10)
          : value,
      }));
    }
  };

  const [paginationDetail, setPaginationDetail] = useState({
    pageNumber: 1,
    pageSize: 15,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log(formData);

      await dispatch(addStudentAction(formData));
      dispatch(getStudents({ paginationDetail }));
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

        const classModesData = await fetchStudentMode();
        setClassModes(classModesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="modalbg">
        <Modal.Title>Add New Student</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalbg">
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

          <Form.Group className="mb-3" controlId="formParentName">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control
              type="text"
              name="parentName"
              placeholder="Enter parent's name"
              value={formData.parentName || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

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
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                maxLength="10"
                onChange={(e) => {
                  const regex = /^[0-9\b]+$/;
                  if (e.target.value === "" || regex.test(e.target.value)) {
                    setFormData((prevData) => ({
                      ...prevData,
                      phoneNumber: e.target.value,
                    }));
                  }
                }}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Grade</option>
              {grades.map((grade, index) => (
                <option key={index} value={grade.item1}>
                  {grade.item2}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

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
                    onChange={handleInputChange}
                    inline
                    required
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formClassMode">
            <Form.Label>Class Mode</Form.Label>
            <Row>
              {classModes.map((mode, index) => (
                <Col key={index} md={4}>
                  <Form.Check
                    type="radio"
                    label={mode.item2}
                    name="studyModeId"
                    value={mode.item1}
                    checked={formData.studyModeId === mode.item1}
                    onChange={handleInputChange}
                    inline
                    required
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
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

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              rows={3}
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* New Input Groups for Centre Details */}
          <Form.Group className="mb-3" controlId="formCentreName">
            <Form.Label>Centre Name</Form.Label>
            <Form.Control
              type="text"
              name="centreName"
              placeholder="Enter centre name"
              value={formData.centreName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCentrePlace">
            <Form.Label>Place</Form.Label>
            <Form.Control
              type="text"
              name="centrePlace"
              placeholder="Enter place"
              value={formData.centrePlace}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formJoiningDate">
            <Form.Label>Joining Date</Form.Label>
            <Form.Control
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCurrentLevel">
            <Form.Label>Current Level</Form.Label>
            <Form.Control
              type="text"
              name="currentLevel"
              placeholder="Enter current level"
              value={formData.currentLevel}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCompletedLevel">
            <Form.Label>Completed Level</Form.Label>
            <Form.Control
              type="text"
              name="completedLevel"
              placeholder="Enter completed level"
              value={formData.completedLevel}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Student Image</Form.Label>
            <Form.Control
              type="file"
              name="profile"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Form.Group>
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          <Form.Group controlId="formBirthCertificate" className="mb-3">
            <Form.Label>Upload Birth Certificate</Form.Label>
            <Form.Control
              type="file"
              name="birthCertificate"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Form.Group>
          {birthCertificatePreview && (
            <div className="mb-3">
              <img
                src={birthCertificatePreview}
                alt="Birth Certificate Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          <Button variant="success" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Student"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStudentPanel;
