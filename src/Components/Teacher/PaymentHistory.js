import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Badge, Form, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "../Teacher/PaymentHistory.css";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../redux/Action/StudentAction";

const PaymentHistory = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [filter, setFilter] = useState("");
  const [teacherData, setTeacherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const datePickerRef = useRef(null);

  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setSelectedDate(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const storedTeacherData = localStorage.getItem("teacherData");

    if (storedTeacherData) {
      try {
        setTeacherData(JSON.parse(storedTeacherData));
      } catch (error) {
        console.error("Error parsing teacherData:", error);
        localStorage.removeItem("teacherData");
      }
    }
  }, []);

  useEffect(() => {
    if (teacherData && teacherData.userData) {
      const paginationDetail = {
        pageSize: 15,
        pageNumber: 1,
      };
      dispatch(getStudents({ paginationDetail, teacherId: teacherData.userData.teacherId }));
    }
  }, [dispatch, teacherData]);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge bg="success">{status}</Badge>;
      case "Pending":
        return <Badge bg="warning">{status}</Badge>;
      case "Failed":
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Filter payments by name and date
  const filteredPayments = Array.isArray(students?.data?.searchAndListStudentResult)
    ? students.data.searchAndListStudentResult.filter((student) => {
        const matchesSearch = [student.firstName, student.email].join(" ").toLowerCase();
        return matchesSearch.includes(filter.toLowerCase());
      })
    : [];

  const handleAction = (action, rowData) => {
    // Delegating to separate component now
    console.log(`Action: ${action}`, rowData);
  };

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && (
          <TeacherSidePanel teachingModeid={teacherData?.userData?.stausId} />
        )}
        <Container className="main-container p-4 min-vh-100">
          <Row className="align-items-center mb-4">
            <div>
            <Col md={6} style={{ marginTop: "20px" }}>
              <h2 className="fw-bold">Payment History</h2>
            </Col>

            <Col xs="auto" className="p-0 m-0">
              <Button className="btn btn-success addbtn">
                <i className="bi bi-plus"></i> Add Fees
              </Button>
            </Col>

            <Col xs="auto" className="p-0 m-0">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                isClearable
                customInput={<FaCalendarAlt size={20} style={{ cursor: "pointer" }} />}
              />
            </Col>
            </div>
            <Col xs="auto" className="p-0 m-0">
              <Form.Control
                type="text"
                placeholder="Search Name..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="search-input"
                style={{ width: "300px", marginRight: "0px" }}
              />
            </Col>
          </Row>

          <Table responsive bordered style={{ width: "98%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Date of Birth</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.registerNumber}</td>
                    <td>{payment.firstName}</td>
                    <td>{payment.dob}</td>
                    <td>{"121"}</td>
                    <td>{"Online"}</td>
                    <td>{renderStatusBadge(payment.statusName)}</td>
                    <td className="action-column">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm"
                          title="View"
                          onClick={() => handleAction("view", payment)}
                        >
                          <i className="bi bi-eye text-primary" style={{ fontSize: "18px" }}></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          title="Edit"
                          onClick={() => handleAction("edit", payment)}
                        >
                          <i className="bi bi-pencil text-success" style={{ fontSize: "18px" }}></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          title="Delete"
                          onClick={() => handleAction("remove", payment)}
                        >
                          <i className="bi bi-trash text-danger" style={{ fontSize: "18px" }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No payment data found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default PaymentHistory;
