import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TeacherHeader from "./TeacherHeader";
import TeacherSidePanel from "./TeacherSidepannel";

const AssignClass = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const assignedClasses = [
    {
      id: 1,
      subject: "Mathematics",
      teacher: "Mr. John Doe",
      time: "10:00 AM",
    },
    { id: 2, subject: "Science", teacher: "Ms. Sarah Smith", time: "11:30 AM" },
    {
      id: 3,
      subject: "English",
      teacher: "Mrs. Emily Johnson",
      time: "02:00 PM",
    },
  ];
 
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
          <h2 className="fw-bold text-center mb-4">Assigned Classes</h2>
          <Row className="sub-container">
            {assignedClasses.map((cls) => (
              <Col md={6} lg={4} key={cls.id} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold">{cls.subject}</h5>
                    <p className="text-muted">Teacher: {cls.teacher}</p>
                    <p>
                      <strong>Time:</strong> {cls.time}
                    </p>
                    <Button variant="primary" className="btn-sm">
                      Join Class
                    </Button>
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

export default AssignClass;
