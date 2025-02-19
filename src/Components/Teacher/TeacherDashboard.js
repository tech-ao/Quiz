import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { FaBook, FaFileAlt, FaCalendar, FaBookOpen } from "react-icons/fa";
import { FaPrint, FaShareAlt } from "react-icons/fa";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );

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

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <Row style={{ marginTop: "80px" }}>
            <Col md={4} className="stats-container">
              <Card className="gradient-card text-white mb-3">
                <Card.Body
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "100px" }}
                >
                  <FaBook size={32} className="me-3" />
                  <div>
                    <div className="fs-6" style={{ color: "black" }}>
                      Total Students
                    </div>
                    <div className="fs-2 fw-bold" style={{ color: "black" }}>
                      10
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="gradient-card text-white mb-3">
                <Card.Body
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "100px" }}
                >
                  <FaFileAlt size={32} className="me-3" />
                  <div>
                    <div className="fs-6" style={{ color: "black" }}>
                      Leave Application
                    </div>
                    <div className="fs-2 fw-bold" style={{ color: "black" }}>
                      05
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="gradient-card text-white mb-3">
                <Card.Body
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "100px" }}
                >
                  <FaCalendar size={32} className="me-3" />
                  <div>
                    <div className="fs-6" style={{ color: "black" }}>
                      Upcoming Classes
                    </div>
                    <div className="fs-2 fw-bold" style={{ color: "black" }}>
                      32
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="gradient-card text-white">
                <Card.Body
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "100px" }}
                >
                  <FaBookOpen size={32} className="me-3" />
                  <div>
                    <div className="fs-6" style={{ color: "black" }}>
                      Assignment
                    </div>
                    <div className="fs-2 fw-bold" style={{ color: "black" }}>
                      17
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8} style={{ width: "800px" }}>
              <Card>
                <Card.Body style={{ height: "115%" }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">
                      <b>Payment History</b>
                    </h4>
                    <div>
                      <Button variant="primary" className="btn btn-success">
                        <FaPrint className="me-1" />
                        Print
                      </Button>
                      <Button variant="primary" className="btn btn-success">
                        <FaShareAlt
                          className="me-1"/>
                        Share
                      </Button>
                    </div>
                  </div>
                  <Table responsive>
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>Purpose</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div>Fauget Cafe</div>
                          <small className="text-muted">Coffee Shop</small>
                        </td>
                        <td>
                          <div>Today</div>
                          <small className="text-muted">2m ago</small>
                        </td>
                        <td>
                          <div>$ 500</div>
                          <small className="text-muted">QR Code</small>
                        </td>
                        <td>
                          <span className="badge bg-success">Done</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Rigo Stationary</div>
                          <small className="text-muted">A4 Sheets</small>
                        </td>
                        <td>
                          <div>Today</div>
                          <small className="text-muted">10m ago</small>
                        </td>
                        <td>
                          <div>$ 100</div>
                          <small className="text-muted">Transfer</small>
                        </td>
                        <td>
                          <span className="badge bg-success">Done</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Claudia Store</div>
                          <small className="text-muted">Accessories</small>
                        </td>
                        <td>
                          <div>Today</div>
                          <small className="text-muted">5m ago</small>
                        </td>
                        <td>
                          <div>$ 1,000</div>
                          <small className="text-muted">Transfer</small>
                        </td>
                        <td>
                          <span className="badge bg-success">Done</span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="text-center mt-3">
                    <Button variant="link">Show All My Transactions</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TeacherDashboard;
