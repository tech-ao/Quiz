
import React, { useState, useEffect } from "react";
import { Container, Form, Table } from "react-bootstrap";
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
      setSidebarVisible(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
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
    if (student) {
      setSelectedPerson(student);
      setSelectedDate(null);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const getAttendanceForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return MOCK_ATTENDANCE[dateString] || [];
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
              const isHighlighted =
                MOCK_ATTENDANCE[dateString] &&
                selectedPerson &&
                MOCK_ATTENDANCE[dateString].includes(selectedPerson.id);
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
            <h2 style={{ margin: 0 }}>Student Attendance</h2>
          </div>

          {/* Sticky Table Container for Filters */}
          <div
            style={{
              position: "sticky",
              top: `${headerHeight}px`,
              backgroundColor: "white",
              zIndex: 999,
              padding: "15px",
              paddingRight: "50px",
            }}
          >
            <Table className="table-sm" style={{ width: "40%" }}>
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Level</th>
                  <th style={{ width: "25%" }}>Student</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form.Select
                      value={selectedLevel}
                      onChange={handleLevelChange}
                      style={{ width: "150px" }}
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
                  <td>
                    <div
                      className="d-flex align-items-center"
                      style={{ position: "relative", marginLeft: "20px" }}
                    >
                      <Form.Select
                        onChange={handleStudentSelect}
                        value={selectedPerson?.id || ""}
                        style={{ width: "150px" }}
                        disabled={!selectedLevel}
                      >
                        <option value="">Select Student</option>
                        {selectedLevel &&
                          studentList
                            .filter(
                              (s) => s.level === Number(selectedLevel)
                            )
                            .map((student) => (
                              <option key={student.id} value={student.id}>
                                {student.name}
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
                            left: "20px",
                            zIndex: 2,
                            width: "100px",
                          }}
                        />
                        <FaFilter style={{ fontSize: "32px" }} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Attendance Details if a Date is Chosen */}
          {selectedPerson && selectedDate && (
            <div className="attendance-list mt-4" style={{ marginLeft: "27px" }}>
              <h6 style={{ fontSize: "20px" }}>
                <b>
                  Attendance for {selectedPerson.name} on{" "}
                  {selectedDate.toDateString()}
                </b>
              </h6>
              <p
                style={{
                  marginLeft: "50px",
                  color: getAttendanceForDate(selectedDate).includes(
                    selectedPerson.id
                  )
                    ? "black"
                    : "red",
                }}
              >
                {getAttendanceForDate(selectedDate).includes(selectedPerson.id) ? (
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
          )}

          {/* Render Yearly Calendar Only When a Student is Selected */}
          {selectedPerson && (
            <div
              className="calendar-grid"
              style={{  overflowY: "auto" }}
            >
              {renderYearlyCalendar()}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default StudentAttendance;
