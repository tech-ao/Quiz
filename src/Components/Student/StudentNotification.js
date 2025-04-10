import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Modal } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StudentNotification.css";
import StudentHeader from "./StudentHeader";
import Sidebar from "./StudnetSidebar";

function NotificationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notifications, setNotifications] = useState([]); // Initialize as an empty array
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [loading, setLoading] = useState(true); // To indicate loading state
  const [error, setError] = useState(null); // To handle API errors

  const studentId = 1065; // Replace with the actual student ID or fetch it dynamically
  const apiKey = "3ec1b120-a9aa-4f52-9f51-eb4671ee1280";

  useEffect(() => {
    const handleResize = () => {
      // Sidebar visible only for screens 1024px and above
      setIsSidebarVisible(window.innerWidth >= 1024);
      setIsSmallScreen(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://srimathicare.in:8081/api/SearchAndList/SearchAndListNotification",
          {
            method: "POST",
            headers: {
              accept: "text/plain",
              "X-Api-Key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              studentId: studentId,
              paginationDetail: {
                pageSize: 100,
                pageNumber: 1,
              },
            }),
          }
        );

        if (!response.ok) {
          const message = `An error occurred: ${response.status}`;
          throw new Error(message);
        }

        const data = await response.json();
        if (data.isSuccess && data.data && data.data.notifications) {
          // Map the API response to the structure used in your component
          const formattedNotifications = data.data.notifications.map((notif) => ({
            id: notif.notificationId,
            title: notif.message, // Assuming 'message' is the title
            content: notif.message, // Assuming 'message' is also the content for simplicity
            receivedDate: notif.meetingDate || new Date().toISOString().split("T")[0], // Use meetingDate if available, otherwise current date
            isRead: notif.isRead,
          }));
          setNotifications(formattedNotifications);
        } else {
          setNotifications([]); // Set to empty array if no notifications
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching notifications:", err);
        setNotifications([]); // Ensure notifications are empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [studentId, apiKey]); // Re-fetch if studentId or apiKey changes

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

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error loading notifications: {error}</div>;
  }

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
              <Col md={6} className="d-flex justify-content-end" style={{ marginTop: "10px" }}>
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
                  style={{ margin: "0 15px 0 10px" }}
                >
                  <div className="notification-title">{notification.title}</div>
                  <small className="text-muted" style={{ marginRight: "30px" }}>
                    Received on: {notification.receivedDate}
                  </small>
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