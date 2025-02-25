import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TeacherHeader from "./TeacherHeader";
import TeacherSidePanel from "./TeacherSidepannel";

const CompletedClass = () => {
  const completedClasses = [
    { id: 1, subject: "History", teacher: "Mr. Brown", date: "Feb 10, 2025" },
    { id: 2, subject: "Geography", teacher: "Ms. White", date: "Feb 15, 2025" },
    { id: 3, subject: "Physics", teacher: "Dr. Adams", date: "Feb 18, 2025" },
  ];
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
          <h2 className="fw-bold text-center mb-4">Completed Classes</h2>
          <Row className="sub-container">
            {completedClasses.map((cls) => (
              <Col md={6} lg={4} key={cls.id} className="mb-3">
                <Card className="shadow-sm bg-light">
                  <Card.Body>
                    <h5 className="fw-bold">{cls.subject}</h5>
                    <p className="text-muted">Teacher: {cls.teacher}</p>
                    <p>
                      <strong>Date:</strong> {cls.date}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CompletedClass;
