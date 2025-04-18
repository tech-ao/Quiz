import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditPaymentModal({ showEdit, setShowEdit, filteredPayments, handleUpdatePayment, initialEditData }) {
  const [formData, setFormData] = useState({
    id: initialEditData?.id || 0,
    studentId: initialEditData?.studentId || 0,
    createdBy: initialEditData?.createdBy || 0,
    createdOn: initialEditData?.createdOn || new Date().toISOString(),
    date: initialEditData?.date ? new Date(initialEditData.date) : new Date(),
    createdByRole: initialEditData?.createdByRole || 1,
    description: initialEditData?.description || "",
    isDeleted: initialEditData?.isDeleted || false,
    paymentMode: initialEditData?.paymentMode || 1,
    paymentModeName: initialEditData?.paymentModeName || "",
    status: initialEditData?.status || 1,
    statusName: initialEditData?.statusName || "",
    amount: initialEditData?.amount || 0
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

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date
    }));
  };

  const handleSave = () => {
    handleUpdatePayment(formData);
    setShowEdit(false);
  };

  return (
    <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Payment</Modal.Title>
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
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="1">Pending</option>
              <option value="2">Completed</option>
              <option value="3">Failed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={new Date(formData.date)}
              onChange={handleDateChange}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </Form.Group>

          <Button variant="success" onClick={handleSave}>
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditPaymentModal;
