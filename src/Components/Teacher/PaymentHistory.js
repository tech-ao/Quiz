import React, { useState } from 'react';
import { Container, Row, Col, Table, Badge, Form, Button, Modal } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';
import './PaymentHistory.css';

const paymentHistory = [
  { id: 1, studentName: 'Hudson', amount: '$100', date: '2024-12-01', mode: 'Online', status: 'Completed', bankDetails: { bankName: 'ABC Bank', accountNumber: '1234567890', time: '10:30 AM', transactionId: 'TXN12345' } },
  { id: 2, studentName: 'Marlie', amount: '$50', date: '2024-12-02', mode: 'Offline', status: 'Pending', bankDetails: { bankName: 'XYZ Bank', accountNumber: '0987654321', time: '11:00 AM', transactionId: 'TXN54321' } },
  { id: 3, studentName: 'Ayan Desai', amount: '$200', date: '2024-12-03', mode: 'Online', status: 'Failed', bankDetails: { bankName: 'PQR Bank', accountNumber: '1122334455', time: '1:00 PM', transactionId: 'TXN67890' } },
  { id: 4, studentName: 'Kaylen', amount: '$150', date: '2024-12-04', mode: 'Offline', status: 'Completed', bankDetails: { bankName: 'LMN Bank', accountNumber: '2233445566', time: '2:30 PM', transactionId: 'TXN98765' } },
  { id: 5, studentName: 'Paul S. Bealer', amount: '$250', date: '2024-12-05', mode: 'Online', status: 'Completed', bankDetails: { bankName: 'DEF Bank', accountNumber: '3344556677', time: '3:00 PM', transactionId: 'TXN11223' } },
];

const PaymentHistory = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <Badge bg="success">{status}</Badge>;
      case 'Pending': return <Badge bg="warning">{status}</Badge>;
      case 'Failed': return <Badge bg="danger">{status}</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container" style={{ marginRight: '20px' }}>
            <Row className="align-items-center mb-4">
              <Col md={6}>
                <h2 className="fw-bold">Payment History</h2>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Form.Control
                  type="text"
                  placeholder="Search by Student Name"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ width: '60%', marginRight: '20px' }}
                />
              </Col>
            </Row>
            <Table responsive bordered className="payment-history-table">
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
                {paymentHistory.filter(payment => payment.studentName.toLowerCase().includes(filter.toLowerCase()))
                  .map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.studentName}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.date}</td>
                      <td>{payment.mode}</td>
                      <td>{renderStatusBadge(payment.status)}</td>
                      <td>
                        <Button variant="info" size="sm" onClick={() => handleViewDetails(payment)}>
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
      {selectedPayment && (
        <Modal show onHide={() => setSelectedPayment(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Bank Name:</strong> {selectedPayment.bankDetails.bankName}</p>
            <p><strong>Account Number:</strong> {selectedPayment.bankDetails.accountNumber}</p>
            <p><strong>Time:</strong> {selectedPayment.bankDetails.time}</p>
            <p><strong>Transaction ID:</strong> {selectedPayment.bankDetails.transactionId}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedPayment(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PaymentHistory;
