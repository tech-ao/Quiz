import React from 'react';
import { Container, Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap';
import '../Style.css'
function AdminDashboard() {
  return (
    <Container fluid className="p-4 bg-light">
      <Row className="align-items-center mb-4">
        <Col md={6} className="d-flex align-items-center">
          <h2 className="fw-bold">Dashboard</h2>
          <span className="ms-3 text-secondary">12:40 PM</span>
        </Col>
        <Col md={6} className="d-flex justify-content-end gap-3">
          <Button variant="link">🌐 Website</Button>
          <Button variant="link">👤 Admin</Button>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control placeholder="Search" />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>      
        <Col md={6} className="d-flex justify-content-end gap-3">
          <Button  className='chipButton' variant="outline-secondary">Add Students</Button>
          <Button className ='chipButton' variant="outline-secondary">Add Quiz</Button>
        </Col>
      </Row>
      <Row className="mb-4">
        {[
          { label: "Total Students", count: "100+", icon: "👥" },
          { label: "Active Students", count: "10+", icon: "🎯" },
          { label: "Verified Students", count: "36", icon: "🔍" },
          { label: "Completed Projects", count: "29", icon: "✅" }
        ].map((item, index) => (
          <Col md={3} key={index}>
            <Card className="shadow-sm p-3 mb-3 ">
              <Card.Body>
                <h5>{item.label}</h5>
                <h3>{item.count}</h3>
                <span>{item.icon}</span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={4}>
          <Card className="shadow-sm p-3 mb-3 bg-white rounded">
            <Card.Body>
              <h5>Quiz</h5>
              <Row>
                {[...Array(4)].map((_, i) => (
                  <Col md={6} key={i} className="mb-3">
                    <Card className="shadow-sm">
                      <Card.Body className="text-center">
                        Total Students<br />
                        <h4>100+</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3 mb-3 bg-white rounded">
            <Card.Body>
              <h5>New Registered</h5>
              <ul className="list-unstyled">
                {["1", "2", "3", "4", "5"].map((item, index) => (
                  <li key={index}>S.no {item} | Name | Level</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3 mb-3 bg-white rounded">
            <Card.Body>
              <h5>Top Rank</h5>
              <ul className="list-unstyled">
                {["1", "2", "3", "4", "5"].map((item, index) => (
                  <li key={index}>S.no {item} | Name | Level | Mark</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default AdminDashboard;