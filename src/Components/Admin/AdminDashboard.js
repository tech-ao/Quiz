import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './adminDashboard.css';
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";

function AdminDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  }; 

  return (
    <div>
    <AdminHeader toggleSidebar={toggleSidebar} />
    <div className="d-flex">
      {isSidebarVisible && <Sidebar />}
      <Container className="main-container p-4 min-vh-100">
        <div className="sub-container">
            {/* Header Section */}
            <Row className="align-items-center mb-4">
              <Col md={6}>
                <h2 className="fw-bold">Admin Dashboard</h2>
              </Col>
            </Row>

            {/* Cards Section */}
            <Row>
              <Col lg={8} sm={12}>
                <Row>
                  {[
                    { label: "Total Students", count: "0", color: "blue", icon: "📦" },
                    { label: "Sub Categories", count: "0", color: "pink", icon: "📚" },
                    { label: "Live Contests", count: "0", color: "green", icon: "🏆" },
                    { label: "Fun 'N' Learn", count: "0", color: "orange", icon: "🎓" },
                  ].map((item, index) => (
                    <Col md={6} sm={6} xs={12} key={index} className="mb-4">
                      <Card className="dashboard-card shadow-sm">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                          }}
                        >
                          {/* Icon Section */}
                          <div
                            className="icon-container"
                            style={{
                              backgroundColor: item.color,
                              borderRadius: "8px",
                              padding: "15px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <span className="icon" style={{ fontSize: "2rem", color: "#fff" }}>
                              {item.icon}
                            </span>
                          </div>

                          {/* Text Section */}
                          <div 
                          style={{
                            marginLeft:'2rem'
                          }}
                          >
                            <h5 className="mt-3">{item.label}</h5>
                            <h3>{item.count}</h3>
                          </div>
                        </div>
                        
                      </Card>
                      
                    </Col>
                    
                  ))}
                </Row>
              </Col>

              {/* Calendar Section */}
              <Col lg={4} sm={12} className="mb-4">
                <Card className="shadow calendar-card">
                  <Card.Body>
                    <h5 className="calendar-heading">Calendar</h5>
                    <Calendar />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Quiz Section */}
            <Row>
              <Col md={4} sm={12} className="mb-4">
                <Card className="shadow-sm p-3  rounded">
                  <Card.Body>
                    <h5>Quiz</h5>
                    <Row>
                      {[...Array(4)].map((_, i) => (
                        <Col xs={6} key={i} className="mb-3">
                          <Card className="shadow-smv bg-white">
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

              {/* Filter Options */}
              <Col md={8} sm={12}>
                <Card className="shadow-sm p-3  rounded">
                  <Card.Body>
                    <h5 className="mb-4">Filter Options</h5>
                    <Row>
                      <Col md={6} sm={12}>
                        <Form.Group>
                          <Form.Label>Grade</Form.Label>
                          <Form.Select>
                            <option value="">Select Grade</option>
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                            <option value="grade3">Grade 3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={12}>
                        <Form.Group>
                          <Form.Label>Top Rank</Form.Label>
                          <Form.Select>
                            <option value="">Select Rank</option>
                            <option value="rank1">Rank 1</option>
                            <option value="rank2">Rank 2</option>
                            <option value="rank3">Rank 3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminDashboard;
