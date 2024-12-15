import React ,{useState}from 'react';
import { Container, Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap';
import '../../Style.css';
import Sidebar from './SidePannel';
import AdminHeader from './AdminHeader';

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

        <Container fluid className="p-4 maincontainerbg min-vh-100">
          <div className="sub-container">
            <Row className="align-items-center mb-4">
              <Col md={6} className="d-flex align-items-center">
                <h2 className="fw-bold">Admin Dashboard</h2>
                {/* <span className="ms-3 text-secondary">12:40 PM</span> */}
              </Col>
            </Row>

           
            {/* Cards Section */}
            <Row className="mb-4">
              {[
                { label: "Total Students", count: "100+", icon: "👥" },
                { label: "Active Students", count: "10+", icon: "🎯" },
                { label: "Verified Students", count: "36", icon: "🔍" },
                { label: "Completed Projects", count: "29", icon: "✅" },
              ].map((item, index) => (
                <Col md={3} key={index}>
                  <Card
                    className="shadow-sm p-3 mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: 'rgb(231 255 236)', // Default bg color
                      borderRadius: '10px',
                      color: 'black',
                    }}
                  >
                    <div
                      className="icon-outlined"
                      style={{
                        fontSize: '30px', // Icon size
                        display: 'block',
                        marginBottom: '10px',
                      }}
                    >
                      {item.icon}
                    </div>
                    <Card.Body className="text-center">
                      <h5>{item.label}</h5>
                      <h3>{item.count}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Responsive Left-Side Card */}
            <Row>
              <Col md={4} sm={12} className="mb-4">
                <Card className="shadow-sm p-3 bg-white rounded">
                  <Card.Body>
                    <h5>Quiz</h5>
                    <Row>
                      {[...Array(4)].map((_, i) => (
                        <Col xs={6} key={i} className="mb-3">
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

              {/* Grade and Top Rank Fields */}
              <Col md={8} sm={12}>
                <Card className="shadow-sm p-3 bg-white rounded">
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
