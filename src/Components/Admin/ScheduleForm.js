import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container, Row, Col, Table, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./ScheduleForm.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { addSheduleAction } from "../../redux/Action/SheduleAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BASE_URL from "../../redux/Services/Config";

const ScheduleForm = () => {
  const dispatch = useDispatch();
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [days, setDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [manualQuestions, setManualQuestions] = useState("");
  const [mentalQuestions, setMentalQuestions] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fees, setFees] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null);
  const COMMON_HEADERS = {
    Accept: "text/plain",
    "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
    AccessToken: "123",
    "Content-Type": "application/json",
  };
  
  const getHeaders = () => ({
    ...COMMON_HEADERS,
  });
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const calculateEndDate = (days, startDate) => {
    if (days && startDate) {
      const start = new Date(startDate);
      start.setDate(start.getDate() + parseInt(days, 10));
      setEndDate(start.toISOString().split("T")[0]);
    } else {
      setEndDate("");
    }
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    setDays(value);
    calculateEndDate(value, startDate);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    calculateEndDate(days, value);
  };

  const clearForm = () => {
    setDays("");
    setStartDate("");
    setTotalTime("");
    setManualQuestions("");
    setMentalQuestions("");
    setEndDate("");
    setFees("");
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${BASE_URL}/ScheduleTime/GetAll`, {
        method: "GET",
        headers: getHeaders(),
      });
  
      if (!response.ok) throw new Error("Failed to fetch schedules");
  
      const data = await response.json();
      console.log(data);
      
      setScheduleList(data.data);
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      noOfDays: parseInt(days),
      totalTime,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      manual: parseInt(manualQuestions),
      mental: parseInt(mentalQuestions),
      fees: parseFloat(fees)
    };

    dispatch(addSheduleAction(requestBody));
    toast.success("Schedule created successfully!");
    clearForm();
    fetchSchedules();
  };

  const openEditModal = (schedule) => {
    setEditSchedule(schedule);
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditSchedule((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "noOfDays" || name === "startDate") {
      const daysValue = name === "noOfDays" ? value : editSchedule.noOfDays;
      const startDateValue = name === "startDate" ? value : editSchedule.startDate;
      if (daysValue && startDateValue) {
        const start = new Date(startDateValue);
        start.setDate(start.getDate() + parseInt(daysValue, 10));
        setEditSchedule((prev) => ({
          ...prev,
          endDate: start.toISOString()
        }));
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/ScheduleTime/Update`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          id: editSchedule.id,
          noOfDays: parseInt(editSchedule.noOfDays),
          totalTime: editSchedule.totalTime,
          startDate: new Date(editSchedule.startDate).toISOString(),
          endDate: new Date(editSchedule.endDate).toISOString(),
          manual: parseInt(editSchedule.manual),
          mental: parseInt(editSchedule.mental),
          fees: parseFloat(editSchedule.fees)
        })
      });
  
      if (!response.ok) throw new Error("Failed to update schedule");
  
      toast.success("Schedule updated successfully!");
      setEditModal(false);
      fetchSchedules();
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update schedule.");
    }
  };
  

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            <Row className="sticky-title align-items-center mb-4">
              <Col>
                <h2 className="fw-bold text-left">Schedule Time</h2>
              </Col>
            </Row>

            <Card className="p-4 ms-3 shadow-lg" style={{ backgroundColor: "rgb(207, 245, 215)" }}>
              <Row className="justify-content-center">
                <Col md={12}>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Number of Days</Form.Label>
                          <Form.Control
                            type="number"
                            value={days}
                            onChange={handleDaysChange}
                            placeholder="Enter number of days"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Total Time</Form.Label>
                          <Form.Control
                            type="text"
                            value={totalTime}
                            onChange={(e) => setTotalTime(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="Schedule-start-end mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Start Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={startDate}
                            min={getTodayDate()}
                            onChange={handleStartDateChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                        <Form.Group>
                          <Form.Label className="fw-bold">End Date</Form.Label>
                          <Form.Control type="date" value={endDate} readOnly />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="Schedule-man-men mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Manual</Form.Label>
                          <Form.Control
                            type="number"
                            value={manualQuestions}
                            onChange={(e) => setManualQuestions(e.target.value)}
                            placeholder="Enter number of manual questions"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Mental</Form.Label>
                          <Form.Control
                            type="number"
                            value={mentalQuestions}
                            onChange={(e) => setMentalQuestions(e.target.value)}
                            placeholder="Enter number of mental questions"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Fees</Form.Label>
                          <Form.Control
                            type="number"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                            placeholder="Enter fees"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col md={12} className="d-flex justify-content-center rounded">
                        <Button variant="primary" type="submit" className="Schedule-button text-center">
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>

            <h4 className="mt-5">Scheduled List</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Days</th>
                  <th>Total Time</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Manual</th>
                  <th>Mental</th>
                  <th>Fees</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scheduleList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.noOfDays}</td>
                    <td>{item.totalTime}</td>
                    <td>{item.startDate.split("T")[0]}</td>
                    <td>{item.endDate.split("T")[0]}</td>
                    <td>{item.manual}</td>
                    <td>{item.mental}</td>
                    <td>{item.fees}</td>
                    <td>
                      <Button size="sm" onClick={() => openEditModal(item)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </div>
        </Container>
      </div>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editSchedule && (
            <Form>
              <Form.Group>
                <Form.Label>No. of Days</Form.Label>
                <Form.Control
                  type="number"
                  name="noOfDays"
                  value={editSchedule.noOfDays}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Total Time</Form.Label>
                <Form.Control
                  type="text"
                  name="totalTime"
                  value={editSchedule.totalTime}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={editSchedule.startDate.split("T")[0]}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Manual</Form.Label>
                <Form.Control
                  type="number"
                  name="manual"
                  value={editSchedule.manual}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mental</Form.Label>
                <Form.Control
                  type="number"
                  name="mental"
                  value={editSchedule.mental}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Fees</Form.Label>
                <Form.Control
                  type="number"
                  name="fees"
                  value={editSchedule.fees}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ScheduleForm;
