import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, } from "react-bootstrap";
import { FaBullhorn } from "react-icons/fa";
import TeacherSidePanel from "./TeacherSidepannel";
import AdminHeader from "../Admin/AdminHeader";

const Announcements = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);

  const announcements = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "2023-10-15",
      description: "Join us for a parent-teacher meeting to discuss student progress and upcoming events."
    },
    {
      id: 2,
      title: "School Holiday Notice",
      date: "2023-10-20",
      description: "Please note that there will be no school on October 20th due to a public holiday."
    },
    {
      id: 3,
      title: "New Curriculum Updates",
      date: "2023-10-25",
      description: "We have updated the curriculum for the upcoming semester. Please review the changes."
    },
    {
      id: 4,
      title: "Field Trip Announcement",
      date: "2023-11-01",
      description: "A field trip is scheduled for November 1st. Permission slips are due by October 25th."
    },
    {
      id: 5,
      title: "Exam Schedule Released",
      date: "2023-11-05",
      description: "The exam schedule for the upcoming semester has been released. Please check your email."
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true); // Show sidebar by default on desktop
      } else {
        setIsSidebarVisible(false); // Hide sidebar by default on mobile
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Admin Header with Toggle Sidebar */}
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container  className="main-container p-4 min-vh-100">
        <div className="sub-container">
         
         
              <h2 className="fw-bold mb-4 text-center">Announcements</h2>
              
          
            {/* Upcoming Classes Section */}
            
         
     

          <Row className="justify-content-center"> {/* Center the cards */}
            {announcements.map(announcement => (
              <Col md={6} lg={12} key={announcement.id}> {/* Adjust the column size as needed */}
                <Card className="dashboard-card text-center">
                  <Card.Body>
                    <FaBullhorn size={40} className="text-info mb-3" />
                    <Card.Title>{announcement.title}</Card.Title>
                    <Card.Text>{announcement.description}</Card.Text>
                    <p className="announcement-date">{announcement.date}</p>
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

export default Announcements;
