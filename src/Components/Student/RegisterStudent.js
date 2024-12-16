import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import StudentHeader from "./StudentHeader";
import "react-toastify/dist/ReactToastify.css";
import { addStudentAction, getStudents } from "../../redux/Action/StudentAction";
import { fetchCountries, fetchGrades, fetchGenders } from "../../redux/Services/Enum";
import "./RegisterStudent.css";

const RegisterStudent = () => {
  const [countries, setCountries] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    country: "",
  });

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [countriesData, gradesData] = await Promise.all([
          fetchCountries(),
          fetchGrades(),
        ]);
        setCountries(countriesData);
        setGrades(gradesData);
      } catch (error) {
        toast.error("Error fetching data!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(addStudentAction(formData));
      dispatch(getStudents({ pageNumber: 1, pageSize: 15 }));
      toast.success("Student registered successfully!");
    } catch (error) {
      toast.error("Failed to register student!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
    {/* <StudentHeader studentName={"Ram" || 'N/A'} /> */}
    <div className="d-flex bg-image">
      <Container className="register-container">
      
        <Card className="register-card shadow">
          <Card.Header className="text-center bg-success text-white">
            <h2>Register New Student</h2>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="firstName" className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName" className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="phoneNumber" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    maxLength="10"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="dob" className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="country" className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.item1} value={country.item1}>
                            {country.item2}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="grade" className="mb-3">
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

                <div className="d-grid">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Register Student"}
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      
      </Container>
      
      
      </div>
   
    </div>
   
  );
};

export default RegisterStudent;
