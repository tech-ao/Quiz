import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editStudentAction, getStudents } from "../../redux/Action/StudentAction";

const EditStudent = ({ show, onClose }) => {
  const { selectedStudent } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    userId:null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    address: "",
    role: 3,
    statusId: 1,
    createdBy: 1,
    country: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8012/api/Enum/Country", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            AccessToken: "123",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedStudent && selectedStudent?.data) {
      setFormData({
        firstName: selectedStudent.data.firstName || "",
        lastName: selectedStudent.data.lastName || "",
        email: selectedStudent.data.email || "",
        phoneNumber: selectedStudent.data.phoneNumber || "",
        dob: selectedStudent.data.dob
          ? selectedStudent.data.dob.split("T")[0]
          : "",
        grade: selectedStudent.data.grade || "",
        address: selectedStudent.data.address || "",
        country: selectedStudent.data.country || null,
      });
    }
  }, [selectedStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      userId:selectedStudent.data.userId,
      statusId: 1,
      role: 3
    });

    if (name === "countrySearch") {
      const searchValue = value.toLowerCase();
      const filtered = countries.filter((country) =>
        country.item2.toLowerCase().includes(searchValue)
      );
      setFilteredCountries(filtered);
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
      console.log(formData, paginationDetail);
      await dispatch(editStudentAction(formData, selectedStudent.studentId,paginationDetail));
      dispatch(getStudents({ paginationDetail }));
      toast.success("Student modified successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add student!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <option value="1">Abacus Beginner</option>
              <option value="2">Abacus Explorer</option>
              <option value="3">Abacus Skilled</option>
              <option value="4">Abacus Expert</option>
              <option value="5">Abacus Mastermind</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Select
              name="country"
              value={formData.country || ""} // Numeric country ID
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

          <Button variant="success" type="submit">
            Save Student
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStudent;
