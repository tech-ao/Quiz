import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AdminAttendance.css";
import SidePannel from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { FaFilter } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TeacherAttendance = ({
  teacherList = [],
  currentYear = new Date().getFullYear(),
}) => {
  const [selectedTeacherType, setSelectedTeacherType] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

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
    setSelectedDate(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setSidebarVisible(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

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
      setSelectedDate(null);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const renderAttendanceList = () => {
    if (!selectedPerson || !selectedDate) return null;
    const isPresent = selectedPerson.attendance.some(
      (date) => date.toDateString() === selectedDate.toDateString()
    );

    return (
      <div className="attendance-list mt-4" style={{ marginLeft: "27px" }}>
        <h6 style={{ fontSize: "20px" }}>
          <b>
            Attendance for {selectedPerson.name} on{" "}
            {selectedDate.toDateString()}
          </b>
        </h6>
        <p style={{ marginLeft: "50px", color: isPresent ? "black" : "red" }}>
          {isPresent ? (
            <>
              <FaCheckCircle className="me-2" /> Present
            </>
          ) : (
            <>
              <FaTimesCircle className="me-2" /> Absent
            </>
          )}
        </p>
      </div>
    );
  };

  const renderYearlyCalendar = () => {
    if (!selectedPerson) return null;
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
              const isHighlighted = selectedPerson.attendance.some(
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
        <Container className="main-container" style={{ overflowY: "auto" }}>
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
            <h2 style={{ margin: 0 }}>Teacher Attendance</h2>
          </div>

          {/* Sticky Table Container immediately below the title */}
          <div
            style={{
              position: "sticky",
              top: `${headerHeight}px`,
              backgroundColor: "white",
              zIndex: 999,
            }}
          >
            <Table className="table-sm" style={{ width: "35%" }}>
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Type</th>
                  <th style={{ width: "25%" }}>Teacher</th>
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
                        style={{ width: "150px", marginLeft: "20px" }}
                        disabled={!selectedTeacherType}
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
                      {/* Filter Icon */}
                      <div style={{ position: "relative", marginLeft: "25px" }}>
                        <div
                          onClick={() => setShowCalendar(!showCalendar)}
                          style={{ cursor: "pointer" }}
                        >
                          <FaFilter style={{ fontSize: "32px" }} />
                        </div>
                        {showCalendar && (
                          <div
                          style={{
                            position: "absolute",
                            top: "40px",
                            right: "100%",
                            zIndex: 1000,
                          }}
                          >
                            <Calendar
                              onChange={handleDateChange}
                              value={selectedDate || new Date()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Attendance list if a date is chosen */}
          {selectedPerson && selectedDate && renderAttendanceList()}

          {/* Render calendar view for yearly attendance if a teacher has been selected */}
          {selectedPerson && (
            <div className="calendar-grid" style={{ overflowY: "auto" }}>
              {renderYearlyCalendar()}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default TeacherAttendance;
