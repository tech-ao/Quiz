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
  const [dashboardData, setDashboardData] = useState([]);
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

  const handleCardClick = (label) => {
    switch (label) {
      case "Total Students":
        navigate("/studentList");
        break;
      case "Total Teacher":
        navigate("/listteacher");
        break;
      case "Enrollment Request":
        navigate("/enrollmentRequest");
        break;
      case "Total Question":
        navigate("/questionListPage");
        break;
      case "Total Levels":
        navigate("/quiz");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            <Row className="sticky-title align-items-center mb-4">
              <h2 className="fw-bold text-left">Admin Dashboard</h2>
            </Row>

            {/* Dashboard Cards and Calendar */}
            <div className="dashboard-calendar-wrapper mb-4">
              {/* Dashboard Cards Container (75% width on large screens) */}
              <div className="dashboard-cards-container" style={{ display: "inline-block", width: "75%" }}>
                <Row className="g-4">
                  {[
                    { label: "Total Students", count: dashboardDatas.activeCount || 0, img: studentImg },
                    { label: "Total Teacher", count: dashboardDatas.teacherCount || 0, img: teacherImg },
                    { label: "Enrollment Request", count: 0, img: enrolImg },
                    { label: "Total Question", count: dashboardDatas.questionsCount || 0, img: questionImg },
                    { label: "Total Levels", count: dashboardDatas.levelscount || 0, img: questionImg },
                    { label: "Total Quizzes", count: dashboardDatas.quizCount || 0, img: questionImg }
                  ].map((item, index) => (
                    <div className="col-lg-6 col-md-6 col-sm-12" key={index} style={{padding:"0px", height:"105px"}}>
                      <Card
                        className="dashboard-card shadow-sm mb-4"
                        onClick={() => handleCardClick(item.label)}
                      
                      >
                        <Card.Body className="d-flex align-items-center"   style={{height:"100px"}}>
                          <img
                            src={item.img}
                            alt={item.label}
                            className="card-icon me-3"
                            width="50"
                            height="50"
                          />
                          <div className="ms-3 w-100 d-flex flex-column">
                            <h5 className="fw-bold m-0" style={{ fontSize: "1.1rem" }}>
                              {item.label}
                            </h5>
                            <h3 className="m-0" style={{ fontSize: "1.5rem" }}>
                              {item.count}
                            </h3>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </Row>
              </div>

              {/* Calendar Container with fixed width and height */}
              <div className="calendar-container" style={{ width: "450px", height: "350px" }}>
                <Card className="calendar-card shadow-sm" style={{ height: "100%" }}>
                  <Card.Body className="calendar-card-body">
                    <h5 className="calendar-heading text-center fw-bold">Calendar</h5>
                    <div className="d-flex justify-content-center">
                      <Calendar className="calender-note" />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/* Filter Options */}
            <Row className="g-4">
              <Col lg={6} md={12} sm={12}>
                <Card className="filter-card shadow-sm rounded">
                  <Card.Body>
                    <h5 className="mb-4 fw-bold">Filter Options</h5>
                    <Row>
                      <Col lg={3} md={6} sm={12}>
                        <Form.Group>
                          <Form.Label>Grade:</Form.Label>
                          <Form.Select className="filter-select">
                            <option value="">Select</option>
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                            <option value="grade3">Grade 3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col lg={3} md={6} sm={12}>
                        <Form.Group>
                          <Form.Label>Rank:</Form.Label>
                          <Form.Select className="filter-select">
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
