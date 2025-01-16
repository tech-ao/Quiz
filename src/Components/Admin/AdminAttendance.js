import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css"; // Custom styles for the calendar

const AdminAttendance = () => {
  const [selectedType, setSelectedType] = useState("Student");
  const [list, setList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const studentList = [
    { id: 1, name: "John Doe", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/50" },
  ];

  const teacherList = [
    { id: 1, name: "Mr. Adams", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Ms. Brown", image: "https://via.placeholder.com/50" },
  ];

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setList(type === "Student" ? studentList : teacherList);
    setSelectedPerson(null); // Reset the selected person
  };

  const handleViewAttendance = (person) => {
    setSelectedPerson(person);
    setAttendanceDates([new Date(2025, 0, 10), new Date(2025, 0, 15)]); // Example highlighted dates
  };

  const handleDateClick = (date) => {
    if (attendanceDates.some((d) => d.toDateString() === date.toDateString())) {
      setAttendanceDates(attendanceDates.filter((d) => d.toDateString() !== date.toDateString()));
    } else {
      setAttendanceDates([...attendanceDates, date]);
    }
  };

  const renderYearlyCalendar = () => {
    return months.map((month, monthIndex) => {
      const daysInMonth = getDaysInMonth(monthIndex, currentYear);
      const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

      return (
        <div className="month-container" key={month}>
          <h5 className="month-name">{month}</h5>
          <div className="days-grid">
            {daysArray.map((day) => {
              const date = new Date(currentYear, monthIndex, day);
              const isHighlighted = attendanceDates.some(
                (d) => d.toDateString() === date.toDateString()
              );

              return (
                <div
                  key={day}
                  className={`day ${isHighlighted ? "highlighted" : ""}`}
                  onClick={() => handleDateClick(date)}
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
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          <Row>
            <Col xs={12} className="d-flex justify-content-between align-items-center">
              <h3>Attendance Management</h3>
              <Form.Select value={selectedType} onChange={handleTypeChange} style={{ width: "200px" }}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((person, index) => (
                    <tr key={person.id}>
                      <td>{index + 1}</td>
                      <td className="d-flex align-items-center">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="profile-image"
                        />
                        <span className="ms-2">{person.name}</span>
                      </td>
                      <td>
                        <Button onClick={() => handleViewAttendance(person)} variant="primary">
                          View Attendance
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          {selectedPerson && (
            <Row className="mt-4">
              <Col xs={12}>
                <div className="yearly-calendar">
                  <div className="header d-flex align-items-center justify-content-between">
                    <h5>
                      Attendance for {selectedPerson.name} ({selectedType})
                    </h5>
                    <div className="year-selector">
                      <button onClick={() => setCurrentYear(currentYear - 1)}>{"<"}</button>
                      <span className="year-display">{currentYear}</span>
                      <button onClick={() => setCurrentYear(currentYear + 1)}>{">"}</button>
                    </div>
                  </div>
                  <div className="calendar-grid">{renderYearlyCalendar()}</div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AdminAttendance;
