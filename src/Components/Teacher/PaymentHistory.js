import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Badge, Form, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "../Teacher/PaymentHistory.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const paymentHistory = [
  { id: 1, studentName: "Hudson", amount: "$100", date: "2024-12-01", mode: "Online", status: "Completed" },
  { id: 2, studentName: "Marlie", amount: "$50", date: "2024-12-02", mode: "Offline", status: "Pending" },
  { id: 3, studentName: "Ayan Desai", amount: "$200", date: "2024-12-03", mode: "Online", status: "Failed" },
  { id: 4, studentName: "Kaylen", amount: "$150", date: "2024-12-04", mode: "Offline", status: "Completed" },
  { id: 5, studentName: "Paul S. Bealer", amount: "$250", date: "2024-12-05", mode: "Online", status: "Completed" },
];

const PaymentHistory = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const filterIconRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

 const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
   const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
 
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
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        filterIconRef.current &&
        !filterIconRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const filteredPayments = paymentHistory
    .filter((payment) => payment.studentName.toLowerCase().includes(filter.toLowerCase()))
    .filter((payment) => {
      if (!selectedDate) return true;
      const selectedDateFormatted = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD format
      return payment.date === selectedDateFormatted;
    });

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <Row className="align-items-center mb-4">
            <Col md={6} style={{ marginTop: "20px" }}>
              <h2 className="fw-bold">Payment History</h2>
            </Col>
          </Row>
          <div className="d-flex justify-content-end align-items-center mb-3" style={{ position: "relative" }}>
            <Form.Control
              type="text"
              placeholder="Search Name...."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="search-Bar"
            />
            <div ref={filterIconRef} className="Filtericon" style={{ position: "relative", marginLeft: "10px" }}>
              <FaCalendarAlt
                size={24}
                style={{ cursor: "pointer", color: "green" }}
                onClick={() => setShowDatePicker(!showDatePicker)}
              />
              {showDatePicker && (
  <div
    ref={datePickerRef}
    className="datepick"
    style={{
      position: "absolute",
      top: "100%",
      right: "0",
      zIndex: 1000,
      background: "white",
      padding: "6px",
      borderRadius: "5px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        setShowDatePicker(false);
      }}
      inline
    />
    <p 
      className="text-center mt-2" 
      style={{ cursor: "pointer", color: "green", fontWeight: "bold" }} 
      onClick={() => setSelectedDate(null)}
    >
      Clear
    </p>
  </div>
)}

            </div>
          </div>
          
         

          <Table responsive bordered style={{ width: "98%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.studentName}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>{payment.mode}</td>
                    <td>{renderStatusBadge(payment.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">No payment data found matching your criteria</td>
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