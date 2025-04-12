// Import required modules
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import "./ScheduleForm.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";

const ScheduleForm = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [days, setDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [manualQuestions, setManualQuestions] = useState("");
  const [mentalQuestions, setMentalQuestions] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fees, setFees] = useState("");

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate End Date when Days or Start Date changes
  const calculateEndDate = (days, startDate) => {
    if (days && startDate) {
      const start = new Date(startDate);
      start.setDate(start.getDate() + parseInt(days, 10));
      setEndDate(start.toISOString().split("T")[0]);
    } else {
      setEndDate("");
    }
  };

  // Handle Days Input
  const handleDaysChange = (e) => {
    const value = e.target.value;
    setDays(value);
    calculateEndDate(value, startDate);
  };

  // Handle Start Date Input (Prevent Past Date)
  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    calculateEndDate(days, value);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      days,
      startDate,
      endDate,
      totalTime,
      manualQuestions,
      mentalQuestions,
      fees,
    });
    alert("Schedule saved successfully!");
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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
                    {/* Number of Days and Total Time in a single row */}
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

                    {/* Start Date and End Date */}
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

                    {/* Manual and Mental Questions */}
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

                    {/* Fees Field */}
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

                    {/* Submit Button */}
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
    </div>
  );
};

export default ScheduleForm;
