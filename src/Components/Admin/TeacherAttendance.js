import React, { useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import Calendar from "react-calendar"; // Correctly imported Calendar
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css";
import SidePannel from "./SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { FaCheckCircle } from "react-icons/fa";

const TeacherAttendance = ({
  teacherList = [],
  currentYear = new Date().getFullYear(),
}) => {
  const [selectedTeacherType, setSelectedTeacherType] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

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

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleTeacherSelect = (e) => {
    const selectedTeacherId = Number(e.target.value);
    const teacher = teacherListExample.find((t) => t.id === selectedTeacherId);
    if (teacher) {
      setSelectedPerson(teacher);
      setAttendanceDates(teacher.attendance || []);
      setSelectedDate(null);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const filterAttendanceByDate = () => {
    if (selectedDate && selectedPerson) {
      return selectedPerson.attendance.filter(
        (attendanceDate) =>
          attendanceDate.toDateString() === selectedDate.toDateString()
      );
    }
    return [];
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
              const isHighlighted = attendanceDates.some(
                (d) => d.toDateString() === date.toDateString()
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
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="mt-3" style={{ paddingLeft: "20px" }}>
              <Col
                xs={12}
                md={6}
                lg={6}
                className="p-3"
                style={{ paddingRight: "50px" }}
              >
                <Table
                  striped
                  bordered
                  hover
                  className="table-sm table-padding"
                  style={{ width: "120%" }}
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
                          className="w-5"
                          style={{ width: "150px" }}
                        >
                          <option value="">Select Type</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Full-Time">Full-Time</option>
                        </Form.Select>
                      </td>
                      <td>
                        {selectedTeacherType &&
                          teacherListExample.length > 0 && (
                            <Form.Select
                              onChange={handleTeacherSelect}
                              className="w-50"
                              aria-label="Select Teacher"
                            >
                              <option value="">Select a teacher</option>
                              {teacherListExample
                                .filter((t) => t.type === selectedTeacherType)
                                .map((teacher) => (
                                  <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                  </option>
                                ))}
                            </Form.Select>
                          )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            {selectedPerson && (
              <Row className="mt-4">
                <Col xs={12}>
                  <h5 className="attendance-title">
                    <b>Attendance for {selectedPerson.name}</b>
                  </h5>
                  <div className="calendar-grid">{renderYearlyCalendar()}</div>
                </Col>
              </Row>
            )}
            {selectedDate && (
              <div className="attendance-details">
                <h6 style={{ marginLeft: "50px" }}>
                  {filterAttendanceByDate().length > 0
                    ? `Attendance for ${selectedDate.toDateString()}`
                    : "No attendance on this date"}
                </h6>
                {filterAttendanceByDate().length > 0 && (
                  <ul>
                    {filterAttendanceByDate().map((attendance, index) => (
                      <li
                        key={index}
                        style={{ marginLeft: "10px", listStyle: "none" }}
                      >
                        <FaCheckCircle
                          style={{ color: "green", marginRight: "5px" }}
                        />
                        {attendance.toDateString()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
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
                  selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                }
                style={{
                  width: "24px",
                  height: "24px",
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 2,
                }}
              />
              <Calendar
                size={25}
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: 0,
                  zIndex: 1,
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherAttendance;
