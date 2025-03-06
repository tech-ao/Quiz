import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "./AttendacebyDate.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { styled } from "@mui/material";

const AttendanceDataPage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 1024
  );
  const [classSelected, setClassSelected] = useState("Class 1");
  const [sectionSelected, setSectionSelected] = useState("A");
  const [attendanceDate, setAttendanceDate] = useState("2024-12-04");

  const attendance = [
    {
      id: 1,
      admission: "1001",
      roll: "0201",
      name: "Hudson",
      status: "Present",
      note: "N/A",
    },
    {
      id: 2,
      admission: "1020",
      roll: "0204",
      name: "Marlie",
      status: "Absent",
      note: "Sick",
    },
    {
      id: 3,
      admission: "120036",
      roll: "23620",
      name: "Ayan Desai",
      status: "Late",
      note: "Traffic",
    },
    {
      id: 4,
      admission: "2152",
      roll: "0205",
      name: "Kaylen",
      status: "Holiday",
      note: "Public Holiday",
    },
    {
      id: 5,
      admission: "7663",
      roll: "6230",
      name: "Paul S. Bealer",
      status: "Half Day",
      note: "Family Emergency",
    },
    {
      id: 6,
      admission: "96302",
      roll: "221002",
      name: "Jacob Bethell",
      status: "Present",
      note: "N/A",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

 const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
   const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
 
   useEffect(() => {
     const handleResize = () => {
       // Sidebar visible only for screens 1024px and above
       setIsSidebarVisible(window.innerWidth >= 1024);
       setIsSmallScreen(window.innerWidth < 768);
       setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
     };
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, []);
 

  // Function to render chip with different colors for status
  const renderStatusChip = (status) => {
    switch (status) {
      case "Present":
        return <span className="status-chip present">Present</span>;
      case "Late":
        return <span className="status-chip late">Late</span>;
      case "Absent":
        return <span className="status-chip absent">Absent</span>;
      case "Holiday":
        return <span className="status-chip holiday">Holiday</span>;
      case "Half Day":
        return <span className="status-chip half-day">Half Day</span>;
      default:
        return <span className="status-chip">N/A</span>;
    }
  };

  return (
    <div>
      {/* Admin Header with Toggle Sidebar */}
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container ">
          <h2 className="fw-bold text-start mb-4" style={{ marginTop: "24px" }}>
            Attendance By Date
          </h2>
          <div className="sub-container">
            {/* Class, Section, and Attendance Date on Same Row */}
            <Row
              className="filter-section mb-4 d-flex align-items-center"
              style={{ width: "98%" }}
            >
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Level *</Form.Label>
                  <Form.Control
                    as="select"
                    value={classSelected}
                    onChange={(e) => setClassSelected(e.target.value)}
                  >
                    <option>Level-0</option>
                    <option>Level-1</option>
                    <option>Level-2</option>
                    <option>Level-3</option>
                    <option>Level-4</option>
                    <option>Level-5</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Attendance Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </Form.Group>
              </Col>

              {/* Search Button in Same Line */}
              <Col md={2} className="d-flex align-items-end">
                <Button
                  variant="success"
                  className="btn-search"
                  onClick={() => console.log("Search clicked")}
                  style={{ backgroundColor: "green", height: "38px", marginTop:"30px" }}
                >
                  Search
                </Button>
              </Col>
            </Row>

            {/* Attendance Table */}
            <div className="attendance-list" style={{ width: "98%" }}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Admission No</th>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Attendance</th>
                    <th>Source</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.admission}</td>
                      <td>{student.roll}</td>
                      <td>{student.name}</td>
                      <td>{renderStatusChip(student.status)}</td>
                      <td>Manual</td>
                      <td>{student.note}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AttendanceDataPage;
