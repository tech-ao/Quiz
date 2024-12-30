import React , {useState , useEffect} from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Notification.css"; // Import the CSS file for styling
import AdminHeader from "./AdminHeader"; // Import header component
import Sidebar from "./SidePannel"; // Import sidebar component

function NotificationPage() {
   const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
   
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
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            {/* Header Section */}
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold">Notifications</h2>
            </Col>
          </Row>
          <Row>
            {/* Placeholder Notifications */}
            {[...Array(5)].map((_, index) => (
              <Col md={12} key={index} className="mb-3">
                <Card className="shadow-sm notification-card">
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    {/* Notification Details */}
                    <div>
                      <h5 className="fw-bold">Notification Title {index + 1}</h5>
                      <p className="text-muted">
                        This is a placeholder for notification content. Details of the notification will be displayed here.
                      </p>
                    </div>
                    {/* Button to view more */}
                    <Button variant="success" className="btn-sm">
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
}

export default NotificationPage;
