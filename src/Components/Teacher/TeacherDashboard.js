import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import {
  FaBook,
  FaFileAlt,
  FaCalendar,
  FaBookOpen,
  FaPrint,
  FaShareAlt,
} from "react-icons/fa";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  const toggleSidebar = () => {
    console.log("Sidebar toggled!");
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const statsData = [
    { title: "Total Students", count: "10", icon: FaBook },
    { title: "Leave Application", count: "05", icon: FaFileAlt },
    { title: "Upcoming Classes", count: "32", icon: FaCalendar },
    { title: "Assignment", count: "17", icon: FaBookOpen },
  ];

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container fluid className="dashboard-container p-4">
          <Row className="mt-4 g-4" style={{ width: "100%" }}>
            {/* Left Column - Stats Cards */}
            <Col xs={12} lg={5} xl={4}>
              {statsData.map((stat, index) => (
                <div key={index} className="mb-4">
                  <Card className="stats-card border-0">
                    <Card.Body className="d-flex align-items-center bg-mint-green rounded">
                      <div className="ms-5">
                        <stat.icon size={24} className="stats-icon me-3" style={{marginTop:'10%'}}/>
                        <div className="d-inline-block">
                          <div className="stats-title">{stat.title}</div>
                          <div className="stats-count">{stat.count}</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Col>

            {/* Right Column - Payment History */}
            <Col xs={12} lg={7} xl={8}>
              <Card className="payment-card border-0 h-100">
                <Card.Body className="bg-mint-green rounded">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0 fw-bold">Payment History</h5>
                    <div className="d-flex align-items-center gap-3 icon-container">
                      <Button
                        variant="link"
                        className="me-2 p-0 icon-only-button"
                      >
                        <FaPrint className="icon-only" />
                        <span className="d-none d-sm-inline"> Print</span>
                      </Button>
                      <Button variant="link" className="p-0 icon-only-button">
                        <FaShareAlt className="icon-only" />
                        <span className="d-none d-sm-inline"> Share</span>
                      </Button>
                    </div>
                  </div>

                  <Table responsive className="payment-table">
                    <thead>
                      <tr className="bg-dark-green text-white">
                        <th className="py-3">Purpose</th>
                        <th className="py-3">Date</th>
                        <th className="py-3">Amount</th>
                        <th className="py-3">Result</th>
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
                          <span className="badge bg-success rounded-pill">
                            Done
                          </span>
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
                          <span className="badge bg-success rounded-pill">
                            Done
                          </span>
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
                          <span className="badge bg-success rounded-pill">
                            Done
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <div className="text-center mt-4">
                    <a href="#" className="text-primary text-decoration-none">
                      Show All My Transactions
                    </a>
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
