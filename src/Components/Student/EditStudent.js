import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editStudentAction, getStudents } from "../../redux/Action/StudentAction";
import { fetchCountries, fetchGrades, fetchGenders, fetchStudentMode } from "../../redux/Services/Enum";

const EditStudent = ({ show, onClose }) => {
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
    statusId: null,
    centreName: "",      // New field: Centre Name
    centrePlace: "",     // New field: Place
    joiningDate: "",     // New field: Joining Date
    currentLevel: "",    // New field: Current Level
    completedLevel: ""   // New field: Completed Level
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
        statusId: selectedStudent.data.statusId || 1,
        centreName: selectedStudent.data.centreName || "",
        centrePlace: selectedStudent.data.centrePlace || "",
        joiningDate: selectedStudent.data.joiningDate ? selectedStudent.data.joiningDate.split("T")[0] : "",
        currentLevel: selectedStudent.data.currentLevel || "",
        completedLevel: selectedStudent.data.completedLevel || ""
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

  const [paginationDetail, setPaginationDetail] = useState({
    pageNumber: 1,
    pageSize: 15,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(editStudentAction(formData, selectedStudent.studentId));
      dispatch(getStudents({ paginationDetail }));
      toast.success("Student modified successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to modify student.");
    } finally {
      setIsSubmitting(false);
    }
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

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

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
              {grades.map((grade) => (
                <option key={grade.item1} value={grade.item1}>
                  {grade.item2}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <div className="d-flex">
                  {genders.map((gender) => (
                    <Form.Check
                      key={gender.item1}
                      type="radio"
                      label={gender.item2}
                      name="gender"
                      value={gender.item1}
                      checked={formData.gender?.toString() === gender.item1.toString()}
                      onChange={handleInputChange}
                      className="me-3"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formStudyMode">
                <Form.Label>Study Mode</Form.Label>
                <div className="d-flex">
                  {classModes.map((mode) => (
                    <Form.Check
                      key={mode.item1}
                      type="radio"
                      label={mode.item2}
                      name="studyModeId"
                      value={mode.item1}
                      checked={formData.studyModeId === mode.item1}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: parseInt(e.target.value, 10),
                          },
                        })
                      }
                      className="me-3"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Select
              name="country"
              value={formData.country || ""}
              onChange={(e) =>
                setFormData({ ...formData, country: parseInt(e.target.value, 10) })
              }
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

          <Button variant="success" type="submit" disabled={isSubmitting}>
            Save Student
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStudent;
