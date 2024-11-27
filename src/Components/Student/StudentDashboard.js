import React from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import "../../Style.css";
import StudentHeader from "./StudentHeader";
import StudentSidePannel from "./StudnetSidebar";

const StudentDashboard = () => {
  const studentData = {
    image: "https://via.placeholder.com/150", // Replace with actual image URL or state
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    dob: "2000-01-01",
  };

  return (
    <div>
      <StudentHeader />
      <div className="d-flex">
        <StudentSidePannel />
        <Container fluid className="p-4 bg-light min-vh-100">
          <div className="sub-container">
            {/* Student Details Section */}
            <Card className="mb-4 p-4">
              <Row className="align-items-center">
                {/* Student Image with Frame */}
                <Col md={3} className="text-center">
                  <div
                    style={{
                      border: "5px solid #4caf50",
                      borderRadius: "50%",
                      padding: "5px",
                      display: "inline-block",
                    }}
                  >
                    <Image
                      src={studentData.image}
                      roundedCircle
                      alt="Student"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  </div>
                </Col>

                {/* Student Details */}
                <Col md={7}>
                  <Row>
                    <Col xs={6}>
                      <p>
                        <strong>Name:</strong> {studentData.name}
                      </p>
                    </Col>
                    <Col xs={6}>
                      <p>
                        <strong>Date of Birth:</strong> {studentData.dob}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <p>
                        <strong>Email:</strong> {studentData.email}
                      </p>
                    </Col>
                    <Col xs={6}>
                      <p>
                        <strong>Phone:</strong> {studentData.phone}
                      </p>
                    </Col>
                  </Row>
                </Col>

                {/* Edit Button */}
                <Col md={2} className="text-center">
                  <Button variant="success">Edit</Button>
                </Col>
              </Row>
            </Card>

            {/* Four Cards in a Row Section */}
            <Row className="g-3"> {/* Added `g-3` for consistent gutter spacing */}
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center bg-pink shadow">
                  <Card.Body>
                    <Card.Title>Total Marks</Card.Title>
                    <Card.Text>85%</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center shadow">
                  <Card.Body>
                    <Card.Title>Attendance</Card.Title>
                    <Card.Text>92%</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center shadow">
                  <Card.Body>
                    <Card.Title>Quizzes Completed</Card.Title>
                    <Card.Text>12</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center shadow">
                  <Card.Body>
                    <Card.Title>Rank</Card.Title>
                    <Card.Text>#3</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;
