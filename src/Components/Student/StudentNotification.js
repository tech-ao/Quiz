import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Modal } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StudentNotification.css";
import StudentHeader from "./StudentHeader";
import Sidebar from "./StudnetSidebar";

function NotificationPage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Notification 1", content: "Details of notification iowrhwihoiffkefaofifoi ehfeuofheeof heoiefhqeofhae foiaehfaeofihnai cie jddiq duhdu udd1", receivedDate: "2024-02-15", isRead: false },
    { id: 2, title: "Notification 2", content: "Details of notification 2", receivedDate: "2024-02-16", isRead: false },
    { id: 3, title: "Notification 3", content: "Details of notification 3", receivedDate: "2024-02-17", isRead: false },
    { id: 4, title: "Notification 4", content: "Details of notification 4", receivedDate: "2024-02-18", isRead: false },
    { id: 5, title: "Notification 5", content: "Details of notification 5", receivedDate: "2024-02-19", isRead: false },
    { id: 6, title: "Notification 1", content: "Details of notification 1", receivedDate: "2024-02-15", isRead: false },
    { id: 7, title: "Notification 2", content: "Details of notification 2", receivedDate: "2024-02-16", isRead: false },
    { id: 8, title: "Notification 3", content: "Details of notification 3", receivedDate: "2024-02-17", isRead: false },
    { id: 9, title: "Notification 4", content: "Details of notification 4", receivedDate: "2024-02-18", isRead: false },
    { id: 20, title: "Notification 5", content: "Details of notification 5", receivedDate: "2024-02-19", isRead: false },
  ]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  
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
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setShowDatePicker(false);
  };

  const handleClearFilter = () => {
    setSelectedDate(null);
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
    setSelectedNotification(notifications.find((notif) => notif.id === notificationId));
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? notification.receivedDate === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="notification-page">
      <StudentHeader toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          {/* Sticky Header */}
          <div className="sticky-header">
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="fw-bold">Notifications</h2>
              </Col>
              <Col md={6} className="d-flex justify-content-end" style={{marginTop:"10px"}}>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={handleSearch}
                  
                />
                <button className="btn btn-light filter-btn" onClick={handleFilterClick}>
                  <FaFilter style={{ fontSize: "30px" }} />
                </button>
                {showDatePicker && (
                  <div className="date-picker-container">
                    <DatePicker
                      selected={selectedDate ? new Date(selectedDate) : null}
                      onChange={handleDateChange}
                      inline
                      showYearDropdown
                      scrollableYearDropdown
                      dateFormat="yyyy-MM-dd"
                    />
                    <span className="clear-filter-text" onClick={handleClearFilter}>
                      Clear
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          </div>

          {/* Notification List */}
          <ListGroup className="notification-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={`notification-item ${notification.isRead ? "read" : "unread"}`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="notification-title">{notification.title}</div>
                  <small className="text-muted" style={{marginRight:"30px"}}>Received on: {notification.receivedDate}</small>
                </ListGroup.Item>
              ))
            ) : (
              <p className="no-notifications">No notifications found.</p>
            )}
          </ListGroup>
        </Container>
      </div>

      {/* Modal for Full Notification View */}
      <Modal show={selectedNotification !== null} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNotification?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedNotification?.content}</p>
          <small className="text-muted">Received on: {selectedNotification?.receivedDate}</small>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NotificationPage;
