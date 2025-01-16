import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import Sidebar from "./StudnetSidebar"; // Ensure this is correctly named
import StudentHeader from "./StudentHeader"; // Ensure this is correctly named
import './StudentSettings.css'; // Import the CSS file for styling

const StudentSettings = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });

  const handleEdit = () => {
    // Logic to handle editing can be implemented here
    alert("Edit functionality to be implemented!");
  };

  return (
    <div>
      <StudentHeader />
      <div className="d-flex">
        <Sidebar />
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <h1>Student Settings</h1>
            <Card className="">
              <Card.Body className="d-flex flex-column ">
                <div className="w-100 d-flex justify-content-between ">
                  <Card.Title>Student Details</Card.Title>
                  <Button 
                    variant="primary" 
                    onClick={handleEdit} 
                    style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                  >
                    Edit
                  </Button>
                </div>
                <Card.Text className="mt-3">
                  <strong>Name:</strong> {studentDetails.name}
                  <br />
                  <strong>Email:</strong> {studentDetails.email}
                  <br />
                  <strong>Phone:</strong> {studentDetails.phone}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentSettings;
