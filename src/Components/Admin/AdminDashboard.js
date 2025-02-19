import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Sidebar from "./SidePannel";
import studentImg from "../images/Total Students icon.png";
import teacherImg from "../images/Total Teacher Icon.png";
import questionImg from "../images/Total Question Icon.png";
import enrolImg from "../images/Enrolment Requet Icon.png";
import AdminHeader from "./AdminHeader";
import { fetchDashboardContent } from "../../redux/Services/Enum";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);

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

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const dashboardData = await fetchDashboardContent();
        setDashboardData(dashboardData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const dashboardDatas = dashboardData?.data || {};
  const dashboardCards = [
    { label: "Total Students", count: dashboardDatas.activeCount || 0, img: studentImg, route: "/studentList" },
    { label: "Total Teacher", count: dashboardDatas.teacherCount || 0, img: teacherImg, route: "/listteacher" },
    { label: "Enrollment Request", count: 0, img: enrolImg, route: "/enrollmentRequest" },
    { label: "Total Question", count: dashboardDatas.questionsCount || 0, img: questionImg, route: "/questionListPage" },
  ];

  const handleCardClick = (label) => {
    const route = dashboardCards.find((item) => item.label === label)?.route;
    if (route) navigate(route);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="sticky-title align-items-center mb-4">
              <h2 className="fw-bold text-left">Admin Dashboard</h2>
            </Row>

            <Row className="g-4">
              <Col lg={8}>
                <Row className="g-3">
                  {dashboardCards.map((item, index) => (
                    <Col lg={6} md={6} sm={12} key={index} style={{ maxWidth: window.innerWidth <= 768 ? "100%" : "500px" }}>
                      <Card 
                        className="dashboard-card shadow-sm p-4 d-flex mb-4" 
                        style={{ maxWidth: window.innerWidth <= 768 ? "100%" : "350px" }}
                        onClick={() => handleCardClick(item.label)}
                      >
                        <Card.Body className="d-flex align-items-center">
                          <img 
                            src={item.img} 
                            alt={item.label} 
                            className="card-icon me-3" 
                            width="50"  
                            height="50" 
                          />
                          <div className="ms-3 w-100 d-flex flex-column">
                            <h5 className="fw-bold m-0" style={{ fontSize: "1.1rem" }}>{item.label}</h5>
                            <h3 className="m-0" style={{ fontSize: "1.5rem" }}>{item.count}</h3>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Card className="quiz-section shadow-sm p-4 mt-4" style={{ maxWidth: window.innerWidth <= 768 ? "100%" : "770px" }}>
                  <Card.Body>
                    <h5 className="fw-bold text-center mb-3">Quiz</h5>
                    <Row>
                      {[...Array(2)].map((_, i) => (
                        <Col md={6} key={i}>
                          <Card className="shadow-sm bg-light">
                            <Card.Body className="text-center p-3">
                              <h6>Quiz {i + 1}</h6>
                              <p>100+ Students</p>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
  <Card className="calendar-card shadow-sm p-4 " style={{ maxWidth: window.innerWidth <= 768 ? "100%" : "400px", maxHeight: window.innerWidth <= 768 ? "100%" : "600px" }}>
    <Card.Body>
      <h5 className="calendar-heading text-center fw-bold">Calendar</h5>
      <div className="d-flex justify-content-center">
        <Calendar className="calender-note" />
      </div>
    </Card.Body>
  </Card>
</Col>

<Col lg={8} className="mt-4">
  <Card className="filter-card shadow-sm p-4 rounded">
    <Card.Body>
      <h5 className="fw-bold text-center mb-3">Filter Options</h5>
      <Row>
        <Col lg={6} md={6} sm={12}>
          <Form.Group>
            <Form.Label>Grade:</Form.Label>
            <Form.Select>
              <option value="">Select</option>
              <option value="grade1">Grade 1</option>
              <option value="grade2">Grade 2</option>
              <option value="grade3">Grade 3</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Form.Group>
            <Form.Label>Rank:</Form.Label>
            <Form.Select>
              <option value="">Select</option>
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
