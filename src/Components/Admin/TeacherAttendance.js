import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css";
import { FaFilter } from "react-icons/fa";
import SidePannel from "./SidePannel";
import AdminHeader from "../Admin/AdminHeader";

const TeacherAttendance = ({
  teacherList = [],
  currentYear = new Date().getFullYear(),
}) => {
  const [selectedTeacherType, setSelectedTeacherType] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // To track the selected date
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSortedAscending, setIsSortedAscending] = useState(true); // Track sort direction

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
    setSelectedDate(null); // Reset date filter when changing teacher type
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
      setSelectedDate(null); // Reset the date filter when a teacher is selected
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value)); // Set the selected date
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
                  className={`day ${isHighlighted ? "highlighted" : ""}`}
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

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setIsSortedAscending(!isSortedAscending);
  };

  // Sort the attendance dates based on the current sorting order
  const sortedAttendanceDates = isSortedAscending
    ? [...attendanceDates].sort((a, b) => a - b) // Ascending
    : [...attendanceDates].sort((a, b) => b - a); // Descending

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
                  style={{ width: "150%" }}
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
                            <div className="d-flex align-items-center position-relative">
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
                              <FaFilter
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                }}
                                onClick={toggleSortOrder} // Toggle sorting on icon click
                              />
                            </div>
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
                  <Form.Control
                    type="date"
                    onChange={handleDateChange}
                    value={
                      selectedDate
                        ? selectedDate.toISOString().split("T")[0]
                        : ""
                    }
                    placeholder="Select a date"
                    style={{ width: "150px", marginLeft:'20px' }} // Decrease the width here
                  />

                  {selectedDate && (
                    <div className="attendance-details">
                      <h6 style={{ width: "150px", marginLeft:'20px' }}>
                        {filterAttendanceByDate().length > 0
                          ? `Attendance for ${selectedDate.toDateString()}`
                          : "No attendance on this date"}
                      </h6>
                      {filterAttendanceByDate().length > 0 && (
                        <ul>
                          {filterAttendanceByDate().map((attendance, index) => (
                            <li key={index}>{attendance.toDateString()}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  <div className="calendar-grid">{renderYearlyCalendar()}</div>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherAttendance;
