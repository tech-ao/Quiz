import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
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
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedTeacherType, setSelectedTeacherType] = useState("");

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const studentList = [
    { id: 1, name: "Vignesh", image: "https://via.placeholder.com/50", level: 0 },
    { id: 2, name: "Dzuoza", image: "https://via.placeholder.com/50", level: 0 },
    { id: 3, name: "Mark Henry", image: "https://via.placeholder.com/50", level: 0 },
    { id: 4, name: "Steve", image: "https://via.placeholder.com/50", level: 1 },
    { id: 5, name: "Abraham", image: "https://via.placeholder.com/50", level: 1 },
    { id: 6, name: "John Doe", image: "https://via.placeholder.com/50", level: 2 },
    { id: 7, name: "Jane Smith", image: "https://via.placeholder.com/50", level: 2 },
    { id: 8, name: "Mark Johnson", image: "https://via.placeholder.com/50", level: 3 },
    { id: 9, name: "Emily Brown", image: "https://via.placeholder.com/50", level: 4 },
    { id: 10, name: "Michael Lee", image: "https://via.placeholder.com/50", level: 4 },
    { id: 11, name: "Clinton", image: "https://via.placeholder.com/50", level: 5 },
    { id: 12, name: "Andrew", image: "https://via.placeholder.com/50", level: 5 },
  ];

  const teacherList = [
    { id: 1, name: "Mr. Adams", image: "https://via.placeholder.com/50", type: "Part-Time", attendance: [new Date(2025, 0, 12), new Date(2025, 5, 18)] },
    { id: 2, name: "Ms. Brown", image: "https://via.placeholder.com/50", type: "part-Time", attendance: [new Date(2025, 1, 10), new Date(2025, 3, 19)] },
    { id: 3, name: "Mr. John", image: "https://via.placeholder.com/50", type: "Full-Time", attendance: [new Date(2025, 1, 10)] },
    { id: 4, name: "Ms. agnes", image: "https://via.placeholder.com/50", type: "Full-Time", attendance: [new Date(2025, 1, 10)] },
  ];

  useEffect(() => {
    setList(selectedType === "Student" ? studentList : teacherList);
    setSelectedPerson(null);
    setSelectedLevel("");
    setSelectedTeacherType("");
  }, [selectedType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    setSelectedPerson(null);
  };

  const handleStudentSelect = (e) => {
    const selectedStudentId = Number(e.target.value);
    const student = studentList.find((s) => s.id === selectedStudentId);
    if (student) {
      setSelectedPerson(student);
      setAttendanceDates([new Date(2025, 0, 10), new Date(2025, 0, 15)]);
    }
  };

  const handleTeacherTypeChange = (e) => {
    setSelectedTeacherType(e.target.value);
    setSelectedPerson(null);
  };

  const handleTeacherSelect = (e) => {
    const selectedTeacherId = Number(e.target.value);
    const teacher = teacherList.find((t) => t.id === selectedTeacherId);
    if (teacher) {
      setSelectedPerson(teacher);
      setAttendanceDates(teacher.attendance || []);
    }
  };

  const renderYearlyCalendar = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.map((month, monthIndex) => {
      const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
      return (
        <div className="month-container" key={month}>
          <h5 className="month-name">{month}</h5>
          <div className="days-grid">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = new Date(currentYear, monthIndex, day);
              const isHighlighted = attendanceDates.some((d) => d.toDateString() === date.toDateString());
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

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
<<<<<<< HEAD
          <Row className="mb-3">
  <Col xs={6}>
    <h3><b>Attendance Management</b></h3>
  </Col>
  <Col xs={6} className="text-right">
    <Form.Select value={selectedType} onChange={handleTypeChange} className="align-right">
      <option value="Student">Student</option>
      <option value="Teacher">Teacher</option>
    </Form.Select>
  </Col>
</Row>


          {/* Student Dropdowns */}
          {selectedType === "Student" && (
            <Row className="mt-3">
              <Col xs={12} md={6} lg={6}>
                <Table className="table-sm" style={{width: "200%"}}>
                  <thead>
                    <tr>
                      <th  style={{width: "50%"}}>Level</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Select value={selectedLevel} onChange={handleLevelChange}>
                          <option value="">Select Level</option>
                          {[...new Set(studentList.map((s) => s.level))].map((level) => (
                            <option key={level} value={level}>{`Level ${level}`}</option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {selectedLevel !== "" && (
                          <Form.Select onChange={handleStudentSelect}>
                            <option value="">Select a Student</option>
                            {studentList
                              .filter((s) => s.level === Number(selectedLevel))
                              .map((student) => (
                                <option key={student.id} value={student.id}>{student.name}</option>
                              ))}
                          </Form.Select>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
=======
            <Row className="mb-3">
              <Col xs={12} className="d-flex justify-content-between align-items-center">
                <h3><b>Attendance Management</b></h3>
                <div style={{ paddingRight: "66px" }}>
                  <Form.Select value={selectedType} className="select-form" onChange={handleTypeChange} style={{ width: '110px' }}>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </Form.Select>
                </div>
>>>>>>> cdf9d006ee79c6e22451423f9e1bef8e03b59ddd
              </Col>
            </Row>

            {/* Student Dropdowns */}
            {selectedType === "Student" && (
              <Row className="mt-3">
                <Col xs={12} md={6} lg={6} className="p-3" style={{ paddingRight: "40px" }}>
                  <Table className="table-sm table-padding" style={{ width: "200%" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "50%" }}>Level</th>
                        <th>Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Select value={selectedLevel} onChange={handleLevelChange}>
                            <option value="">Select Level</option>
                            {[...new Set(studentList.map((s) => s.level))].map((level) => (
                              <option key={level} value={level}>{`Level ${level}`}</option>
                            ))}
                          </Form.Select>
                        </td>
                        <td>
                          {selectedLevel !== "" && (
                            <Form.Select onChange={handleStudentSelect}>
                              <option value="">Select a Student</option>
                              {studentList
                                .filter((s) => s.level === Number(selectedLevel))
                                .map((student) => (
                                  <option key={student.id} value={student.id}>{student.name}</option>
                                ))}
                            </Form.Select>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}

            {/* Teacher Dropdowns */}
            {selectedType === "Teacher" && (
              <Row className="mt-3">
                <Col xs={12} md={6} lg={6} className="p-3" style={{ paddingRight: "40px" }}>
                  <Table striped bordered hover className="table-sm table-padding" style={{ width: '200%' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '50%' }}>Type</th>
                        <th>Teachers</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Select value={selectedTeacherType} onChange={handleTeacherTypeChange}>
                            <option value="">Select Type</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Full-Time">Full-Time</option>
                          </Form.Select>
                        </td>
                        <td>
                          {selectedTeacherType && (
                            <Form.Select onChange={handleTeacherSelect}>
                              <option value="">Select a teacher</option>
                              {teacherList
                                .filter((t) => t.type === selectedTeacherType)
                                .map((teacher) => (
                                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                ))}
                            </Form.Select>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}

            {selectedPerson && (
              <Row className="mt-4">
                <Col xs={12}>
                  <h5>Attendance for {selectedPerson.name}</h5>
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

export default AdminAttendance;