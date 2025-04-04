import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editTeacherAction, getTeachers } from "../../redux/Action/TeacherAction";
import { fetchCountries, fetchGenders } from '../../redux/Services/Enum';

const TeacherSettingEdit = ({ show, onClose }) => {
  const { selectedTeacher } = useSelector((state) => state.teachers);

  const [formData, setFormData] = useState({
    userId: null,
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: null,
    nationality: null,
    permanentAddress: "",
    currentAddress: "",
    experienceCertificate: null,
    resume: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
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

        const gendersData = await fetchGenders();
        setGenders(gendersData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (selectedTeacher && selectedTeacher?.data) {
      setFormData({
        userId: selectedTeacher.data.userId,
        name: selectedTeacher.data.name || "",
        email: selectedTeacher.data.email || "",
        phoneNumber: selectedTeacher.data.phoneNumber || "",
        dob: selectedTeacher.data.dob ? selectedTeacher.data.dob.split("T")[0] : "",
        gender: selectedTeacher.data.gender || null,
        nationality: selectedTeacher.data.nationality || null,
        permanentAddress: selectedTeacher.data.permanentAddress || "",
        currentAddress: selectedTeacher.data.currentAddress || "",
        experienceCertificate: selectedTeacher.data.experienceCertificate || null,
        resume: selectedTeacher.data.resume || null
      });
    }
  }, [selectedTeacher]);

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (files[0].size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("File size should be less than 2MB");
        return;
      }
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await dispatch(editTeacherAction(formDataToSend, { 
        paginationDetail: { pageNumber: 1, pageSize: 15 } 
      }));
      
      toast.success("Teacher modified successfully!");
      onClose();
      dispatch(getTeachers({ pageNumber: 1, pageSize: 15 }));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to modify teacher.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (selectedTeacher && selectedTeacher?.data) {
      setFormData({
        userId: selectedTeacher.data.userId,
        name: selectedTeacher.data.name || "",
        email: selectedTeacher.data.email || "",
        phoneNumber: selectedTeacher.data.phoneNumber || "",
        dob: selectedTeacher.data.dob ? selectedTeacher.data.dob.split("T")[0] : "",
        gender: selectedTeacher.data.gender || null,
        nationality: selectedTeacher.data.nationality || null,
        permanentAddress: selectedTeacher.data.permanentAddress || "",
        currentAddress: selectedTeacher.data.currentAddress || "",
        experienceCertificate: selectedTeacher.data.experienceCertificate || null,
        resume: selectedTeacher.data.resume || null
      });
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton className="modalbg">
        <Modal.Title>Edit Teacher</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalbg">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formTeacherName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formTeacherDob">
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

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formTeacherGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender || ""}
                onChange={(e) => setFormData({ ...formData, gender: parseInt(e.target.value, 10) })}
                required
              >
                <option value="">Select Gender</option>
                {genders.map((gender) => (
                  <option key={gender.item1} value={gender.item1}>
                    {gender.item2}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formTeacherPhone">
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
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formTeacherEmail">
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

            <Form.Group as={Col} controlId="formTeacherNationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Select
                name="nationality"
                value={formData.nationality || ""}
                onChange={(e) => setFormData({ ...formData, nationality: parseInt(e.target.value, 10) })}
                required
              >
                <option value="">Select Nationality</option>
                {filteredCountries.map((country) => (
                  <option key={country.item1} value={country.item1}>
                    {country.item2}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPermanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="permanentAddress"
                placeholder="Enter permanent address"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formCurrentAddress">
              <Form.Label>Current Residential Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="currentAddress"
                placeholder="Enter current address"
                value={formData.currentAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formExperienceCertificate">
              <Form.Label>Experience Certificate</Form.Label>
              <Form.Control
                type="file"
                name="experienceCertificate"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <Form.Text className="text-muted">
                File size less than 2MB
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="formResume">
              <Form.Label>Upload Resume</Form.Label>
              <Form.Control
                type="file"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <Form.Text className="text-muted">
                File size less than 2MB
              </Form.Text>
            </Form.Group>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Teacher'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TeacherSettingEdit;