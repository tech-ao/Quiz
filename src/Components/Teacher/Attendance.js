import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Dropdown } from "react-bootstrap";
import { FunnelFill } from "react-bootstrap-icons";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "./Attendance.css";
import { getStudents, fetchStudent, deleteStudentAction } from "../../redux/Action/StudentAction";
import { useSelector, useDispatch } from "react-redux";

import "bootstrap-icons/font/bootstrap-icons.css";

const Attendance = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, name: "John Doe", registerNumber: "REG001", level: "Level-1", date: "2024-12-04", status: "Present", checked: false },
    { id: 2, name: "Jane Smith", registerNumber: "REG002", level: "Level-2", date: "2024-12-04", status: "Present", checked: false },
    { id: 3, name: "Alice Johnson", registerNumber: "REG003", level: "Level-3", date: "2024-12-04", status: "Present", checked: false },
    { id: 4, name: "Jake", registerNumber: "REG004", level: "Level-4", date: "2024-12-04", status: "Present", checked: false },
    { id: 5, name: "Jason Smith", registerNumber: "REG005", level: "Level-0", date: "2024-12-04", status: "Present", checked: false },
    { id: 6, name: "mmmmm", registerNumber: "REG006", level: "Level-5", date: "2024-12-04", status: "Present", checked: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("");
    const [teacherData, setTeacherData] = useState(null);
    const studentsPerPage = 10;
    const dispatch = useDispatch();


const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    const handleResize = () => {
      // Sidebar visible only for screens 1024px and above
      setIsSidebarVisible(window.innerWidth >= 1024);
      setIsSmallScreen(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
console.log(teacherData);

useEffect(() => {
    const storedTeacherData = localStorage.getItem("teacherData");
  
    if (storedTeacherData) {
      try {
        setTeacherData(JSON.parse(storedTeacherData)); // Parse and set
      } catch (error) {
        console.error("Error parsing teacherData:", error);
        localStorage.removeItem("teacherData"); // Remove corrupted data
      }
    }
  }, []);

useEffect(() => {
    if (teacherData && teacherData.userData) {
      const paginationDetail = {
        pageSize: studentsPerPage,
        pageNumber: 1,
      };
  
      dispatch(getStudents({ paginationDetail, teacherId: teacherData.userData.teacherId }));
    }
  }, [dispatch, 1, teacherData]);
  
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

  const filteredRecords = Array.isArray(students?.data?.searchAndListStudentResult)
  ? students.data.searchAndListStudentResult.filter((student) => {
      const matchesSearch = [student.firstName, student.email]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      return matchesSearch ;
    })
  : [];

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

            <div className=" mb-2 filter-box">
              <Form.Control
                type="text"
                placeholder="Search Name (or) Register number...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchbox"
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
                    <th>Date of Birth</th>
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
                        <td>{record.firstName}</td>
                        <td>{record.registerNumber}</td>
                        <td>{record.gradeName}</td>
                        <td>{new Date(record.dob).toLocaleDateString('en-GB')}</td>
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
