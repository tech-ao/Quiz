import React, { useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css";
import SidePannel from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { Filter } from "lucide-react";
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
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedPerson(null); // Clear selected person when date changes
  };

  // Get all teachers of selected type and their attendance status for selected date
  const renderAttendanceList = () => {
    if (!selectedTeacherType || !selectedDate) return null;

    const typeTeachers = teacherListExample.filter(
      (t) => t.type === selectedTeacherType
    );

    return (
      <div className="attendance-list mt-4" style={{ marginLeft: "27px" }}>
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
                <b style={{ fontWeight: "2px" }}>{teacher.name}</b>
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
      <Container className="main-container p-4 ">
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
                        style={{ width: "150px" }}
                      >
                        <option value="">Select Type</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Full-Time">Full-Time</option>
                      </Form.Select>
                    </td>
                    <td>
                      {selectedTeacherType && (
                        <div className="d-flex align-items-center position-relative">
                          <Form.Select
                            onChange={handleTeacherSelect}
                            value={selectedPerson?.id || ""}
                            style={{ width: "65%" }}
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
                                width: "24px",
                                height: "24px",
                                opacity: 0,
                                position: "absolute",
                                top: 0,
                                left: "27px",
                                zIndex: 2,
                              }}
                            />
                            <Filter
                              size={25}
                              style={{
                                position: "absolute",
                                top: "-10px",
                                left: "27px",
                                zIndex: 1,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Render attendance list or individual attendance */}
          {selectedDate &&
            (selectedPerson ? (
              <Row className="mt-4">
                <Col xs={12}>
                  <h5
                    className="attendance-title"
                    style={{ marginLeft: "27px" }}
                  >
                    <b>Attendance for {selectedPerson.name}</b>
                  </h5>
                  <div className="attendance-details">
                    <h6 style={{ marginLeft: "50px" }}>
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
  );
};

export default TeacherAttendance;
