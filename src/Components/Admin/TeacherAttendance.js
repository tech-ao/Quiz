import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css";
import SidePannel from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { FaFilter } from "react-icons/fa"; // Import filter icon
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TeacherAttendance = ({
  teacherList = [],
  currentYear = new Date().getFullYear(),
}) => {
  const [selectedTeacherType, setSelectedTeacherType] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Set a fixed header height (in pixels)
  const headerHeight = 60;

  const teacherListExample = [
    {
      id: 1,
      name: "John Doe",
      type: "Full-Time",
      attendance: [new Date(2025, 0, 10), new Date(2025, 0, 15)],
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Part-Time",
      attendance: [new Date(2025, 0, 12), new Date(2025, 0, 18)],
    },
    {
      id: 3,
      name: "Robert Brown",
      type: "Full-Time",
      attendance: [new Date(2025, 0, 14), new Date(2025, 0, 20)],
    },
    {
      id: 4,
      name: "Emily Davis",
      type: "Part-Time",
      attendance: [new Date(2025, 0, 11), new Date(2025, 0, 17)],
    },
  ];

  const handleTeacherTypeChange = (e) => {
    setSelectedTeacherType(e.target.value);
    setSelectedPerson(null);
    setAttendanceDates([]);
    setSelectedDate(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(true); // Show sidebar by default on desktop
      } else {
        setSidebarVisible(false); // Hide sidebar by default on mobile
      }
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Adjust initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleTeacherSelect = (e) => {
    const selectedTeacherId = Number(e.target.value);
    const teacher = teacherListExample.find((t) => t.id === selectedTeacherId);
    if (teacher) {
      setSelectedPerson(teacher);
      setAttendanceDates(teacher.attendance || []);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedPerson(null); // Clear selected teacher when date changes
  };

  // Render attendance list for the selected date and teacher type
  const renderAttendanceList = () => {
    if (!selectedTeacherType || !selectedDate) return null;

    const typeTeachers = teacherListExample.filter(
      (t) => t.type === selectedTeacherType
    );

    return (
      <div
        className="attendance-list mt-4"
        style={{ marginLeft: "27px" }}
      >
        <h6 style={{ fontSize: "20px" }}>
          <b>Attendance for {selectedDate.toDateString()}</b>
        </h6>
        <ul className="list-unstyled">
          {typeTeachers.map((teacher) => {
            const isPresent = teacher.attendance.some(
              (date) => date.toDateString() === selectedDate.toDateString()
            );
            return (
              <li
                key={teacher.id}
                className="d-flex align-items-center mb-2"
                style={{ color: isPresent ? "black" : "red" }}
              >
                {isPresent ? (
                  <FaCheckCircle className="me-2" />
                ) : (
                  <FaTimesCircle className="me-2" />
                )}
                <b style={{ fontWeight: "500" }}>{teacher.name}</b>
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
              const isHighlighted = teacherListExample
                .filter((t) => t.type === selectedTeacherType)
                .some((teacher) =>
                  teacher.attendance.some(
                    (d) => d.toDateString() === date.toDateString()
                  )
                );
              return (
                <div
                  key={day}
                  className={`day-cell ${isHighlighted ? "highlighted" : ""}`}
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
        <Container
          className="main-container"
          style={{ overflowY:"hidden" }}
        >
          {/* Sticky Title */}
          <div
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1000,
              padding: "20px 0",
              height: `${headerHeight}px`
            }}
          >
            <h2 style={{ margin: 0 }}>Teacher Attendance</h2>
          </div>

          <div className="sub-container"

          >
            <Row >
              <Col
                xs={12}
                md={6}
                lg={6}
                style={
                  isSmallScreen
                    ? {
                       
                        position: "sticky",
                        top: `${headerHeight}px`,
                        margin: "auto",
                       
                      }
                    : { padding: "15px", paddingRight: "50px" }
                }
              >
                <Table
                  className="table-sm"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "40%" }}>Type</th>
                      <th>Teachers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Select
                          value={selectedTeacherType}
                          onChange={handleTeacherTypeChange}
                          style={{ width: "150px" }}
                        >
                          <option value="">Select Type</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Full-Time">Full-Time</option>
                        </Form.Select>
                      </td>
                      <td>
                        <div
                          className="d-flex align-items-center"
                          style={{ position: "relative" }}
                        >
                          <Form.Select
                            onChange={handleTeacherSelect}
                            value={selectedPerson?.id || ""}
                            style={{ width: "70%" }}
                          >
                            <option value="">Select teacher</option>
                            {selectedTeacherType &&
                              teacherListExample
                                .filter((t) => t.type === selectedTeacherType)
                                .map((teacher) => (
                                  <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                  </option>
                                ))}
                          </Form.Select>
                          <div
                            style={{
                              position: "relative",
                              marginLeft: "20px",
                            }}
                          >
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

            {/* Render attendance list or individual attendance */}
            {selectedDate &&
              (selectedPerson ? (
                <Row style={{ marginTop: "20px" }}>
                  <Col xs={12}>
                    <h5 style={{ marginLeft: "27px", fontWeight: "bold" }}>
                      Attendance for {selectedPerson.name}
                    </h5>
                    <div style={{ marginLeft: "50px" }}>
                      <h6>
                        {selectedPerson.attendance.some(
                          (date) =>
                            date.toDateString() === selectedDate.toDateString()
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

            {/* Render Yearly Calendar */}
            <div className="calendar-grid">{renderYearlyCalendar()}</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherAttendance;
