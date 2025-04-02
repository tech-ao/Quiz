import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import BASE_URL from "../../redux/Services/Config";

const TeacherNotification = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [notifications, setNotifications] = useState([]);
  const teacherId = localStorage.getItem("teacherID"); 

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const COMMON_HEADERS = {
    Accept: "application/json",
    "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
    AccessToken: "123",
    "Content-Type": "application/json",
  };

  const getHeaders = () => ({
    ...COMMON_HEADERS,
  });

  const API_URL = `${BASE_URL}/Teacher/Notification?TeacherId=${teacherId}`;

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: getHeaders(),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        if (data.notifications) {
          setNotifications(data.notifications);
        } else {
          console.warn("No notifications found in the response");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [API_URL]); 

  const handleJoinClass = (classLink) => {
    window.open(classLink, "_blank");
  };

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100 main-box">
          <div className="sticky-header">
            <Row className="mb-4" style={{ paddingTop: '15px' }}>
              <Col>
                <h2 className="fw-bold">Teacher Notifications</h2>
              </Col>
            </Row>
          </div>

          {/* Notification List */}
          <div className="sub-container sub-box">
            <Row>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Col md={12} key={notification.id} className="mb-3">
                    <Card className="shadow-sm notification-card" style={{ width: "95%" }}>
                      <Card.Body className="d-flex align-items-center justify-content-between">
                        <div>
                          <h5 className="fw-bold">{notification.title}</h5>
                          <p className="text-muted">{notification.content}</p>
                        </div>
                        {notification.classLink && (
                          <Button
                            style={{
                              backgroundColor: "#ff5733",
                              borderColor: "#ff5733",
                              color: "white",
                            }}
                            className="btn-sm"
                            onClick={() => handleJoinClass(notification.classLink)}
                          >
                            Join Class
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col md={12}>
                  <p className="text-muted">No notifications found.</p>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherNotification;