import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "../Teacher/PaymentHistory.css";

const paymentHistory = [
  {
    id: 1,
    studentName: "Hudson",
    amount: "$100",
    date: "2024-12-01",
    mode: "Online",
    status: "Completed",
    bankDetails: {
      bankName: "ABC Bank",
      accountNumber: "1234567890",
      time: "10:30 AM",
      transactionId: "TXN12345",
    },
  },
  {
    id: 2,
    studentName: "Marlie",
    amount: "$50",
    date: "2024-12-02",
    mode: "Offline",
    status: "Pending",
    bankDetails: {
      bankName: "XYZ Bank",
      accountNumber: "0987654321",
      time: "11:00 AM",
      transactionId: "TXN54321",
    },
  },
  {
    id: 3,
    studentName: "Ayan Desai",
    amount: "$200",
    date: "2024-12-03",
    mode: "Online",
    status: "Failed",
    bankDetails: {
      bankName: "PQR Bank",
      accountNumber: "1122334455",
      time: "1:00 PM",
      transactionId: "TXN67890",
    },
  },
  {
    id: 4,
    studentName: "Kaylen",
    amount: "$150",
    date: "2024-12-04",
    mode: "Offline",
    status: "Completed",
    bankDetails: {
      bankName: "LMN Bank",
      accountNumber: "2233445566",
      time: "2:30 PM",
      transactionId: "TXN98765",
    },
  },
  {
    id: 5,
    studentName: "Paul S. Bealer",
    amount: "$250",
    date: "2024-12-05",
    mode: "Online",
    status: "Completed",
    bankDetails: {
      bankName: "DEF Bank",
      accountNumber: "3344556677",
      time: "3:00 PM",
      transactionId: "TXN11223",
    },
  },
];

const PaymentHistory = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [filter, setFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const filterIconRef = useRef(null);
  const datePickerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside to close datepicker
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

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };

  const filteredPayments = paymentHistory
    .filter((payment) =>
      payment.studentName.toLowerCase().includes(filter.toLowerCase())
    )
    .filter(
      (payment) =>
        !selectedDate ||
        payment.date === selectedDate.toISOString().split("T")[0]
    );

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container" style={{ marginRight: "10px" }}>
            <Row className="align-items-center mb-4">
              <Col md={6} style={{ marginTop: "20px" }}>
                <h2 className="fw-bold">Payment History</h2>
              </Col>
            </Row>
            <div
              className="d-flex justify-content-end align-items-center mb-3"
              style={{ position: "relative" }}
            >
              <Form.Control
                type="text"
                placeholder="Search here.."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="search-Bar"/>
              <div
                ref={filterIconRef}
                className="Filtericon"
                style={{ position: "relative" }}
              >
                <FaFilter
                  size={24}
                  style={{
                    cursor: "pointer",
                    marginRight: "20px",
                    color: "green",
                  }}
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
                      width: "fit-content",
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.studentName}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>{payment.mode}</td>
                    <td>{renderStatusBadge(payment.status)}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewDetails(payment)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PaymentHistory;
