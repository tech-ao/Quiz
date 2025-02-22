import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css";
import SidePannel from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { FaFilter, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DEFAULT_STUDENT_LIST = [
  { id: 1, name: "Emma Wilson", level: 0 },
  { id: 2, name: "Liam Brown", level: 0 },
  { id: 3, name: "Sophia Davis", level: 0 },
  { id: 4, name: "Noah Taylor", level: 0 },
  { id: 5, name: "Olivia Smith", level: 1 },
  { id: 6, name: "Ethan Johnson", level: 1 },
  { id: 7, name: "Ava Garcia", level: 1 },
  { id: 8, name: "Lucas Miller", level: 1 },
  { id: 9, name: "Isabella Rodriguez", level: 2 },
  { id: 10, name: "Mason Martinez", level: 2 },
  { id: 11, name: "Mia Hernandez", level: 2 },
  { id: 12, name: "Logan Anderson", level: 2 },
  { id: 13, name: "Charlotte Thompson", level: 3 },
  { id: 14, name: "William White", level: 3 },
  { id: 15, name: "Amelia Lewis", level: 3 },
  { id: 16, name: "Benjamin Clark", level: 3 },
  { id: 17, name: "Harper Scott", level: 4 },
  { id: 18, name: "Alexander Hall", level: 4 },
  { id: 19, name: "Evelyn Walker", level: 4 },
  { id: 20, name: "Daniel Young", level: 4 },
  { id: 21, name: "Abigail Allen", level: 5 },
  { id: 22, name: "James Wright", level: 5 },
  { id: 23, name: "Emily Mitchell", level: 5 },
  { id: 24, name: "Samuel Russell", level: 5 },
];

const MOCK_ATTENDANCE = {
  "2025-01-28": [1, 0, 5, 6],
  "2025-02-15": [1, 3, 5, 7],
  "2025-03-20": [2, 4, 6, 8],
  "2025-02-05": [1, 3, 5, 7],
  "2025-01-12": [2, 4, 6, 8],
  "2025-03-22": [1, 2, 5, 6],
  "2025-04-01": [1, 3, 5, 7],
  "2025-04-04": [2, 4, 6, 8],
};

const StudentAttendance = ({
  studentList = DEFAULT_STUDENT_LIST,
  currentYear = new Date().getFullYear(),
}) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const headerHeight = 60;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    setSelectedPerson(null);
    setSelectedDate(null);
  };

  const handleStudentSelect = (e) => {
    const selectedStudentId = Number(e.target.value);
    const student = studentList.find((s) => s.id === selectedStudentId);
    setSelectedPerson(student);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedPerson(null); // Clear selected student when date changes
  };

  const getAttendanceForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return MOCK_ATTENDANCE[dateString] || [];
  };

  const renderAttendanceList = () => {
    if (!selectedLevel || !selectedDate) return null;

    const levelStudents = studentList.filter(
      (s) => s.level === Number(selectedLevel)
    );
    const presentStudents = getAttendanceForDate(selectedDate);

    return (
      <div className="attendance-list mt-4" style={{ marginLeft: "27px" }}>
        <h6 style={{ fontSize: "20px" }}>
          <b>Attendance for {selectedDate.toDateString()}</b>
        </h6>
        <ul className="list-unstyled">
          {levelStudents.map((student) => {
            const isPresent = presentStudents.includes(student.id);
            return (
              <li
                key={student.id}
                className="d-flex align-items-center mb-2"
                style={{ color: isPresent ? "black" : "red" }}
              >
                {isPresent ? (
                  <FaCheckCircle className="me-2" />
                ) : (
                  <FaTimesCircle className="me-2" />
                )}
                <b style={{ fontWeight: "500" }}>{student.name}</b>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderYearlyCalendar = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month, monthIndex) => {
      const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
      return (
        <div className="month-container" key={month}>
          <h5 className="month-name">{month}</h5>
          <div className="days-grid">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = new Date(currentYear, monthIndex, day);
              const dateString = date.toISOString().split("T")[0];
              const hasAttendance = MOCK_ATTENDANCE[dateString]?.length > 0;
              return (
                <div
                  key={day}
                  className={`day-cell ${hasAttendance ? "highlighted" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <SidePannel />}
        <Container className="main-container " style={{ overflowY: "hidden" }}>
          {/* Sticky Title */}
          <div
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1000,
              padding: "20px 0",
              height: `${headerHeight}px`,
            }}
          >
            <h2 style={{ margin: 0 }}>Student Attendance</h2>
          </div>

          <div className="sub-container">
            <Row>
              <Col
                xs={12}
                md={6}
                lg={6}
                style={
                  isSmallScreen
                    ? { position: "sticky", top: `${headerHeight}px`, margin: "auto" }
                    : { padding: "15px", paddingRight: "50px" }
                }
              >
                <Table className="table-sm" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "45%" }}>Level</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Select
                          value={selectedLevel}
                          onChange={handleLevelChange}
                          style={{ width: "85%" }}
                        >
                          <option value="">Select Level</option>
                          {[...new Set(studentList.map((s) => s.level))].map(
                            (level) => (
                              <option key={level} value={level}>
                                Level {level}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </td>
                      <td style={{ width: "60px" }}>
                        <div className="d-flex align-items-center position-relative">
                          <Form.Select
                            onChange={handleStudentSelect}
                            value={selectedPerson?.id || ""}
                            style={{ width: "70%"}}
                          >
                            <option value="" >Select Student</option>
                            {selectedLevel &&
                              studentList
                                .filter((s) => s.level === Number(selectedLevel))
                                .map((student) => (
                                  <option key={student.id} value={student.id}>
                                    {student.name}
                                  </option>
                                ))}
                          </Form.Select>
                          <div style={{ position: "relative", marginLeft: "20px" }}>
                            <Form.Control
                              type="date"
                              onChange={handleDateChange}
                              value={
                                selectedDate
                                  ? selectedDate.toISOString().split("T")[0]
                                  : ""
                              }
                              style={{
                                opacity: 0,
                                position: "absolute",
                                top: 0,
                                left: "27px",
                                zIndex: 2,
                              }}
                            />
                            <FaFilter style={{ fontSize: "30px" }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Render attendance details */}
            {selectedDate &&
              (selectedPerson ? (
                <Row style={{ marginTop: "20px" }}>
                  <Col xs={12}>
                    <h5 style={{ marginLeft: "27px", fontWeight: "bold" }}>
                      Attendance for {selectedPerson.name}
                    </h5>
                    <div style={{ marginLeft: "50px" }}>
                      <h6>
                        {getAttendanceForDate(selectedDate).includes(
                          selectedPerson.id
                        )
                          ? `Present on ${selectedDate.toDateString()}`
                          : `Absent on ${selectedDate.toDateString()}`}
                      </h6>
                    </div>
                  </Col>
                </Row>
              ) : (
                renderAttendanceList()
              ))}

            {/* Render yearly calendar */}
            <div className="calendar-grid">{renderYearlyCalendar()}</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentAttendance;
