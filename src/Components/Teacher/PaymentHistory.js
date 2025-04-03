import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Badge, Form, Button, Modal } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "../Teacher/PaymentHistory.css";

const studentList = ["Hudson", "Marlie", "Ayan Desai", "Kaylen", "Paul S. Bealer"];

const initialPayments = [
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
  const [payments, setPayments] = useState(initialPayments);
  const [showPopup, setShowPopup] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form states
  const [newStudent, setNewStudent] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newPaymentMode, setNewPaymentMode] = useState("Online");
  const [newPaymentStatus, setNewPaymentStatus] = useState("Pending");
  const [newDate, setNewDate] = useState(new Date());

  const datePickerRef = useRef(null);

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
  const filteredPayments = payments
    .filter((payment) => payment.studentName.toLowerCase().includes(filter.toLowerCase()))
    .filter((payment) => {
      if (!selectedDate) return true;
      const selectedDateFormatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      return payment.date === selectedDateFormatted;
    });

  // Function to add a new payment
  const handleAddPayment = () => {
    if (!newStudent || !newAmount) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPayment = {
      id: payments.length + 1,
      studentName: newStudent,
      amount: `$${newAmount}`,
      date: newDate.toISOString().split("T")[0],
      mode: newPaymentMode,
      status: newPaymentStatus,
    };

    setPayments([...payments, newPayment]);
    setShowPopup(false);
  };
  const handleAction = (action, rowData) => {
    setSelectedRow(rowData);
    switch (action) {
      case "view":
        setShowDetails(true);
        break;
      case "edit":
        // Pre-fill form fields
        setNewStudent(rowData.studentName);
        setNewAmount(rowData.amount.replace("$", ""));
        setNewPaymentMode(rowData.mode);
        setNewPaymentStatus(rowData.status);
        setNewDate(new Date(rowData.date));
        setShowEdit(true);
        break;
      case "remove":
        setShowDeleteConfirm(true);
        break;
      default:
        break;
    }
  };
  
  const handleUpdatePayment = () => {
    if (!newStudent || !newAmount) return alert("Please fill all fields");
  
    const updated = payments.map((payment) =>
      payment.id === selectedRow.id
        ? {
            ...payment,
            studentName: newStudent,
            amount: `$${newAmount}`,
            date: newDate.toISOString().split("T")[0],
            mode: newPaymentMode,
            status: newPaymentStatus,
          }
        : payment
    );
    setPayments(updated);
    setShowEdit(false);
  };
  
  const handleDelete = () => {
    const filtered = payments.filter((p) => p.id !== selectedRow.id);
    setPayments(filtered);
    setShowDeleteConfirm(false);
  };
  
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

          <div className="container">
  {/* Search, Date Filter, and Add Fees in One Row */}
  <Row className="mb-3 d-flex justify-content-end align-items-center gap-2">

     {/* Add Fees Button */}
     <Col xs="auto" className="p-0 m-0">
      <Button className="btn btn-success addbtn" onClick={() => setShowPopup(true)}>
        <i className="bi bi-plus"></i> Add Fees
      </Button>
    </Col>

    {/* Date Picker */}
    <Col xs="auto" className="p-0 m-0">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        isClearable
        customInput={<FaCalendarAlt size={20} style={{ cursor: "pointer" }} />}
      />
    </Col>

    {/* Search Bar */}
    <Col xs="auto" className="p-0 m-0">
      <Form.Control
        type="text"
        placeholder="Search Name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search-input"
        style={{ width: "180px", marginRight: "0px" }}
      />
    </Col>

   
  </Row>
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
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.studentName}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>{payment.mode}</td>
                    <td>{renderStatusBadge(payment.status)}</td>
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
                  <td colSpan="6" className="text-center py-3">No payment data found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>

      {/*View Modale*/}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Payment Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedRow && (
      <div>
        <p><strong>Student:</strong> {selectedRow.studentName}</p>
        <p><strong>Amount:</strong> {selectedRow.amount}</p>
        <p><strong>Date:</strong> {selectedRow.date}</p>
        <p><strong>Mode:</strong> {selectedRow.mode}</p>
        <p><strong>Status:</strong> {selectedRow.status}</p>
      </div>
    )}
  </Modal.Body>
</Modal>

        {/*Edit Modale*/}
        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit Payment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Student Name</Form.Label>
        <Form.Select value={newStudent} onChange={(e) => setNewStudent(e.target.value)}>
          <option value="">Select Student</option>
          {studentList.map((student, index) => (
            <option key={index} value={student}>{student}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Payment Method</Form.Label>
        <Form.Check type="radio" label="Online" name="editPaymentMode" checked={newPaymentMode === "Online"} onChange={() => setNewPaymentMode("Online")} />
        <Form.Check type="radio" label="Cash" name="editPaymentMode" checked={newPaymentMode === "Cash"} onChange={() => setNewPaymentMode("Cash")} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select value={newPaymentStatus} onChange={(e) => setNewPaymentStatus(e.target.value)}>
          <option>Pending</option>
          <option>Completed</option>
          <option>Failed</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          className="form-control"
          dateFormat="yyyy-MM-dd"
        />
      </Form.Group>
      <Button variant="success" onClick={handleUpdatePayment}>
        Update
      </Button>
    </Form>
  </Modal.Body>
</Modal>

            {/*Delete Modale*/}

            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete this payment?</p>
    <div className="d-flex justify-content-end gap-2">
      <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </div>
  </Modal.Body>
</Modal>




      {/* Modal Popup */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Select value={newStudent} onChange={(e) => setNewStudent(e.target.value)}>
                <option value="">Select Student</option>
                {studentList.map((student, index) => (
                  <option key={index} value={student}>
                    {student}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Check type="radio" label="Online" name="paymentMode" checked={newPaymentMode === "Online"} onChange={() => setNewPaymentMode("Online")} />
              <Form.Check type="radio" label="Cash" name="paymentMode" checked={newPaymentMode === "Cash"} onChange={() => setNewPaymentMode("Cash")} />
            </Form.Group>

            <Button variant="success" onClick={handleAddPayment}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentHistory;
