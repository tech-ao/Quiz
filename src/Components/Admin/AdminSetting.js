import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Sidebar from '../Admin/SidePannel';
import AdminHeader from '../Admin/AdminHeader';
import './AdminSettings.css';

const AdminSettings = () => {
  return (
    <div>
      <AdminHeader />
      <div className="d-flex">
        <Sidebar />
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="mb-4">
              <Col md={8}>
                <h2 className="fw-bold">Admin Settings</h2>
              </Col>
            </Row>
            <Row className='Admin-Name-row'>
              <Col md={6} className='Admin-Name-row'>
                <Card className="admin-card">
                  <Card.Header className="card-header">Admin Details</Card.Header>
                  <Card.Body>
                    <Card.Title>Admin Name</Card.Title>
                    <Card.Text>
                      Email: admin@example.com
                    </Card.Text>
                    <Card.Text>
                      Phone: 123-456-7890
                    </Card.Text>
                    <Card.Text>
                      Role: Administrator
                    </Card.Text>
                    <Button variant="success" className="mt-3">Edit Details</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className='Admin-Name-row'>
                <Card className="admin-card">
                  <Card.Header className="card-header">Change Password</Card.Header>
                  <Card.Body>
                    <Card.Title>Update your password</Card.Title>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                        <input type="password" className="form-control" id="currentPassword" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input type="password" className="form-control" id="newPassword" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" id="confirmPassword" required />
                      </div>
                      <Button variant="success" type="submit">Change Password</Button>
                    </form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminSettings;
