import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PaymentModal({ showPopup, setShowPopup, filteredPayments, handleAddPayment }) {
  const [formData, setFormData] = useState({
    id: 0,
    studentId: 0,
    createdBy: 0,
    createdOn: new Date().toISOString(),
    date: new Date(),
    createdByRole: 1,
    description: "",
    isDeleted: false,
    paymentMode: 1,
    paymentModeName: "Online",
    status: 1,
    statusName: "Pending",
    amount: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentModeChange = (mode) => {
    setFormData((prev) => ({
      ...prev,
      paymentMode: mode,
      paymentModeName: mode === 1 ? "Online" : "Cash"
    }));
  };

  const handleStatusChange = (e) => {
    const statusValue = Number(e.target.value);
    const statusNames = { 1: "Pending", 2: "Completed", 3: "Failed" };
    setFormData((prev) => ({
      ...prev,
      status: statusValue,
      statusName: statusNames[statusValue]
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date
    }));
  };

  const handleSave = () => {
    handleAddPayment({
      ...formData,
      createdOn: new Date().toISOString()  // update createdOn at save time
    });
    setShowPopup(false);
  };

  return (
    <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            >
              <option value="">Select Student</option>
              {filteredPayments.map((student, index) => (
                <option key={index} value={student.studentId}>
                  {student.firstName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="Online"
              name="paymentMode"
              checked={formData.paymentMode === 1}
              onChange={() => handlePaymentModeChange(1)}
            />
            <Form.Check
              type="radio"
              label="Cash"
              name="paymentMode"
              checked={formData.paymentMode === 2}
              onChange={() => handlePaymentModeChange(2)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleStatusChange}
            >
              <option value="1">Pending</option>
              <option value="2">Completed</option>
              <option value="3">Failed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </Form.Group>

          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModal;
