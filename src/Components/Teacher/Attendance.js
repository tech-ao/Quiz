import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Dropdown } from "react-bootstrap";
import { FunnelFill } from "react-bootstrap-icons";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "./Attendance.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Attendance = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, name: "John Doe", registerNumber: "REG001", level: "Level-1", date: "2024-12-04", status: "Present", checked: false },
    { id: 2, name: "Jane Smith", registerNumber: "REG002", level: "Level-2", date: "2024-12-04", status: "Present", checked: false },
    { id: 3, name: "Alice Johnson", registerNumber: "REG003", level: "Level-3", date: "2024-12-04", status: "Present", checked: false },
    { id: 4, name: "Jake", registerNumber: "REG004", level: "Level-4", date: "2024-12-04", status: "Present", checked: false },
    { id: 5, name: "Jason Smith", registerNumber: "REG005", level: "Level-0", date: "2024-12-04", status: "Present", checked: false },
    { id: 6, name: "Wilson", registerNumber: "REG006", level: "Level-5", date: "2024-12-04", status: "Present", checked: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleCheckboxChange = (index) => {
    const updatedRecords = [...attendanceRecords];
    updatedRecords[index].checked = !updatedRecords[index].checked;
    setAttendanceRecords(updatedRecords);
  };

  const handleAttendanceChange = (index, value) => {
    let updatedRecords = [...attendanceRecords];

    if (value === "Holiday") {
      updatedRecords = updatedRecords.map((record) => ({
        ...record,
        status: "Holiday",
      }));
    } else {
      updatedRecords[index].status = value;
    }

    setAttendanceRecords(updatedRecords);
  };

  const applyBulkStatus = () => {
    if (bulkStatus) {
      setAttendanceRecords(
        attendanceRecords.map((record) =>
          record.checked ? { ...record, status: bulkStatus } : record
        )
      );
    }
  };

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      (record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.registerNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLevel === "" || record.level === selectedLevel)
  );

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="align-items-center mb-4 text-center">
              <Col xs={12} className="heading-text">
                <h2 className="fw-bold">Student Attendance</h2>
              </Col>
            </Row>

            <div className="d-flex mb-2 filter-box">
              <Form.Control
                type="text"
                placeholder="Search Name (or) Register number...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />

              <Dropdown show={showFilterDropdown} onToggle={setShowFilterDropdown}>
                <Dropdown.Toggle variant="light" style={{ border: "none", background: "white" }}>
                  {selectedLevel ? selectedLevel : <FunnelFill style={{ fontSize: "26px" }} />}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedLevel("")}>All Levels</Dropdown.Item>
                  {["Level-0", "Level-1", "Level-2", "Level-3", "Level-4", "Level-5"].map((level) => (
                    <Dropdown.Item key={level} onClick={() => setSelectedLevel(level)}>
                      {level}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="attendance-list" style={{width:"98%"}}>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        type="checkbox"
                        onChange={() =>
                          setAttendanceRecords((prevRecords) =>
                            prevRecords.map((record) => ({ ...record, checked: !record.checked }))
                          )
                        }
                      />
                    </th>
                    <th>Name</th>
                    <th>Register Number</th>
                    <th>Level</th>
                    <th>Date</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record, index) => (
                      <tr key={record.id}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={record.checked}
                            onChange={() => handleCheckboxChange(index)}
                          />
                        </td>
                        <td>{record.name}</td>
                        <td>{record.registerNumber}</td>
                        <td>{record.level}</td>
                        <td>{record.date}</td>
                        <td >
                          <Form.Select className="attendance-clmn"
                            value={record.status}
                            onChange={(e) => handleAttendanceChange(index, e.target.value)}
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Holiday">Holiday</option>
                          </Form.Select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <div className="d-flex mt-3 justify-content-start bulkBtn">
              <Form.Select
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
                className="me-2"
                style={{ width: "150px" }}
              >
                <option value="">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Holiday">Holiday</option>
              </Form.Select>
              <Button variant="success" onClick={applyBulkStatus}>
                Apply
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Attendance;
