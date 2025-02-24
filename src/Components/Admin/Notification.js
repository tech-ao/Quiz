import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaFilter } from "react-icons/fa"; // Import filter icon
import DatePicker from "react-datepicker"; // Import date picker
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import "./Notification.css"; // Import custom styles
import AdminHeader from "./AdminHeader"; // Import header component
import Sidebar from "./SidePannel"; // Import sidebar component

function NotificationPage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide calendar
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Notification 1", content: "Details of notification 1", receivedDate: "2024-02-15" },
    { id: 2, title: "Notification 2", content: "Details of notification 2", receivedDate: "2024-02-16" },
    { id: 3, title: "Notification 3", content: "Details of notification 3", receivedDate: "2024-02-17" },
    { id: 4, title: "Notification 4", content: "Details of notification 4", receivedDate: "2024-02-18" },
    { id: 5, title: "Notification 5", content: "Details of notification 5", receivedDate: "2024-02-19" },
  ]);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = () => {
    setShowDatePicker((prev) => !prev);
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Convert selected date to YYYY-MM-DD format
    setSelectedDate(formattedDate);
    setShowDatePicker(false); // Hide the date picker after selection
  };

  const handleClearFilter = () => {
    setSelectedDate(null);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? notification.receivedDate === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="notification-page">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container ">
          {/* Sticky Header */}
          <div className="sticky-header">
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="fw-bold">Notifications</h2>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <InputGroup className="search-input">
                  <Form.Control
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </InputGroup>
                {/* Filter Icon */}
                <div className="filter-container">
                  <Button variant="light" className="filter-btn" onClick={handleFilterClick}>
                    <FaFilter style={{ fontSize: "30px" }} />
                  </Button>
                  {showDatePicker && (
                    <div className="date-picker-container">
                      <DatePicker
                        selected={selectedDate ? new Date(selectedDate) : null}
                        onChange={handleDateChange}
                        inline
                        className="custom-datepicker"
                        showYearDropdown
                        scrollableYearDropdown
                        dateFormat="yyyy-MM-dd"
                      />
                      <span className="clear-filter-text" onClick={handleClearFilter}>
                        Clear
                      </span>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          {/* Notification List */}
          <div className="sub-container">
            <Row>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <Col md={12} key={notification.id} className="mb-3" >
                    <Card className="shadow-sm notification-card">
                      <Card.Body className="d-flex align-items-center justify-content-between">
                        {/* Notification Details */}
                        <div>
                          <h5 className="fw-bold">{notification.title}</h5>
                          <p>{notification.content}</p>
                          <small className="text-muted">Received on: {notification.receivedDate}</small>
                        </div>
                        {/* View Button */}
                       
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col md={12}>
                  <p className="no-notifications">No notifications found.</p>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default NotificationPage;
