import React, { useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css";
import SidePannel from "./SidePannel";
import AdminHeader from "../Admin/AdminHeader";

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
  { id: 24, name: "Samuel Russell", level: 5 }
];

const StudentAttendance = ({ studentList = DEFAULT_STUDENT_LIST, currentYear = new Date().getFullYear() }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // To track the selected date
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSortedAscending, setIsSortedAscending] = useState(true); // Track sort direction

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    setSelectedPerson(null);
    setAttendanceDates([]);
    setSelectedDate(null); // Reset the date filter when changing level
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleStudentSelect = (e) => {
    const selectedStudentId = Number(e.target.value);
    const student = studentList.find((s) => s.id === selectedStudentId);
    if (student) {
      setSelectedPerson(student);
      // Example attendance dates - you can modify these as needed
      setAttendanceDates([ 
        new Date(2025, 0, 10),
        new Date(2025, 0, 15),
        new Date(2025, 0, 20),
        new Date(2025, 1, 5),
        new Date(2025, 1, 12),
        new Date(2025, 2, 8),
      ]);
      setSelectedDate(null); // Reset the date filter when a student is selected
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value)); // Set the selected date
  };

  const filterAttendanceByDate = () => {
    if (selectedDate && selectedPerson) {
      return attendanceDates.filter(
        (attendanceDate) => attendanceDate.toDateString() === selectedDate.toDateString()
      );
    }
    return [];
  };

  const renderYearlyCalendar = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
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
                <div key={day} className={`day ${isHighlighted ? "highlighted" : ""}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

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
            <Row className="mt-3" style={{ paddingLeft: '20px' }}>
              <Col xs={12} md={6} lg={6} className="p-3" style={{ paddingRight: "40px" }}>
                <Table className="table-sm table-padding" style={{ width: "150%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "38%" }}>Level</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Select value={selectedLevel} onChange={handleLevelChange} style={{ width: "55%" }}>
                          <option value="">Select Level</option>
                          {[...new Set(studentList?.map((s) => s.level))].map((level) => (
                            <option key={level} value={level}>
                              {`Level ${level}`}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {selectedLevel !== "" && (
                          <div className="d-flex align-items-center position-relative">
                            <Form.Select onChange={handleStudentSelect} style={{ width: '45%' }}>
                              <option value="">Select a Student</option>
                              {studentList
                                ?.filter((s) => s.level === Number(selectedLevel))
                                .map((student) => (
                                  <option key={student.id} value={student.id}>
                                    {student.name}
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
                  <h5 className="attendance-title"><b>Attendance for {selectedPerson.name}</b></h5>

                  {/* Date filter section */}
                  <Form.Control
                    type="date"
                    onChange={handleDateChange}
                    value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                    placeholder="Select a date"
                    style={{ width: "150px", marginLeft: '20px' }} // Decrease the width here
                  />

                  {selectedDate && (
                    <div className="attendance-details">
                      <h6 style={{ width: "150px", marginLeft: '20px' }}>
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

                  {/* Render yearly calendar */}
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

export default StudentAttendance;
