import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./ScheduleForm.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { addSheduleAction } from "../../redux/Action/SheduleAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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
                            type="time"
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
          </div>
        </Container>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ScheduleForm;
