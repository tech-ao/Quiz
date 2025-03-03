import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editStudentAction, getStudents } from "../../redux/Action/StudentAction";
import { fetchCountries, fetchGrades, fetchGenders, fetchStudentMode } from '../../redux/Services/Enum';

const SettingEdit = ({ show, onClose }) => {
  const { selectedStudent } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    userId: null,
    firstName: "",
    lastName: "",
    parentName: "",
    studyModeId: null,
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    address: "",
    country: null,
    gender: null,
    statusId: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [grades, setGrades] = useState([]);
  const [classModes, setClassModes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
        setFilteredCountries(countriesData);

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

  useEffect(() => {
    if (selectedStudent && selectedStudent?.data) {
      setFormData({
        userId: selectedStudent.data.userId,
        firstName: selectedStudent.data.firstName || "",
        lastName: selectedStudent.data.lastName || "",
        parentName: selectedStudent.data.parentName || "",
        studyModeId: selectedStudent.data.studyModeId || null,
        email: selectedStudent.data.email || "",
        phoneNumber: selectedStudent.data.phoneNumber || "",
        dob: selectedStudent.data.dob ? selectedStudent.data.dob.split("T")[0] : "",
        grade: selectedStudent.data.grade || "",
        address: selectedStudent.data.address || "",
        country: selectedStudent.data.country || null,
        gender: selectedStudent.data.gender || null,
        statusId: selectedStudent.data.statusId || 1
      });
    }
  }, [selectedStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "countrySearch") {
      const searchValue = value.toLowerCase();
      if (searchValue) {
        const filtered = countries.filter((country) =>
          country.item2.toLowerCase().includes(searchValue)
        );
        setFilteredCountries(filtered);
      } else {
        setFilteredCountries(countries);
      }
    }
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await dispatch(editStudentAction(formData, {paginationDetail: { pageNumber: 1, pageSize: 15 } }));
    
    toast.success("Student modified successfully!");
    
    // Refresh the page to reflect changes (not ideal)
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Adding slight delay to ensure Redux updates before reload
    
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to modify student.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleCancel = () => {
    setFormData({
      userId: selectedStudent.data.userId,
      firstName: selectedStudent.data.firstName || "",
      lastName: selectedStudent.data.lastName || "",
      parentName: selectedStudent.data.parentName || "",
      studyModeId: selectedStudent.data.studyModeId || null,
      email: selectedStudent.data.email || "",
      phoneNumber: selectedStudent.data.phoneNumber || "",
      dob: selectedStudent.data.dob ? selectedStudent.data.dob.split("T")[0] : "",
      grade: selectedStudent.data.grade || "",
      address: selectedStudent.data.address || "",
      country: selectedStudent.data.country || null,
      gender: selectedStudent.data.gender || null,
      statusId: selectedStudent.data.statusId || 1
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="modalbg">
        <Modal.Title>Edit Student</Modal.Title>
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
              placeholder="Enter parent name"
              value={formData.parentName}
              onChange={handleInputChange}
              disabled
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
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              disabled
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade.item1} value={grade.item1}>
                  {grade.item2}
                </option>
              ))}
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

          <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Select
              name="country"
              value={formData.country || ""}
              onChange={(e) => setFormData({ ...formData, country: parseInt(e.target.value, 10) })}
              required
            >
              <option value="">Select Country</option>
              {filteredCountries.map((country) => (
                <option key={country.item1} value={country.item1}>
                  {country.item2}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Save Student
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SettingEdit;
