import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";

const TeacherNotification = () => {
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
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100 main-box">
          <div className="sticky-header">
            <Row className="mb-4" style={{paddingTop:'15px'}}>
              <Col>
                <h2 className="fw-bold">Teacher Notifications</h2>
              </Col>
            </Row>
          </div>

          {/* Notification List */}
          <div className="sub-container sub-box">
            <Row>
              {[...Array(5)].map((_, index) => (
                <Col md={12} key={index} className="mb-3">
                  <Card
                    className="shadow-sm notification-card"
                    style={{ width: "95%" }}
                  >
                    <Card.Body className="d-flex align-items-center justify-content-between">
                      <div>
                        <h5 className="fw-bold">
                          Notification Title {index + 1}
                        </h5>
                        <p className="text-muted">
                          Placeholder text for teacher notifications. Details
                          will be shown here.
                        </p>
                      </div>
                      <Button
                        style={{
                          backgroundColor: "#ff5733",
                          borderColor: "#ff5733",
                          color: "white",
                        }}
                        className="btn-sm"
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherNotification;
