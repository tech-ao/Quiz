import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@mui/material";
import { Navbar, Row, Col, Button, Modal, Offcanvas } from "react-bootstrap";
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiNotification3Line,
  RiAdminLine,
  RiGlobalLine,
  RiMenu3Line,
  RiRestartLine,
} from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Components/images/Logo.png";
import "../Admin/adminHeaderResponsive.css"; // make sure to use the responsive CSS
import UpdatePassword from "../Student/UpdatePassword";

const TeacherHeader = ({ toggleSidebar }) => {
  const ICON_SIZE = 24;
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  // Sample notifications (replace with your actual data source)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New assignment created", content: "Details about the new assignment", receivedDate: "2024-02-15", isRead: false },
    { id: 2, title: "Student submitted work", content: "A student has submitted their homework", receivedDate: "2024-02-16", isRead: false },
    { id: 3, title: "Parent meeting reminder", content: "Reminder about upcoming parent-teacher meeting", receivedDate: "2024-02-17", isRead: false },
    { id: 4, title: "System maintenance", content: "The system will be under maintenance tonight", receivedDate: "2024-02-18", isRead: true },
    { id: 5, title: "Grade submission reminder", content: "Please submit grades by end of week", receivedDate: "2024-02-19", isRead: false },
  ]);
  
  // Calculate unread notifications count
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Get the five most recent notifications
  const lastFiveNotifications = notifications.slice(-5);
  
  // Check if we're in mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const popupRef = useRef(null);
  const notifPopupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update mobile status on window resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    
    // Handle clicks outside popups
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
      if (notifPopupRef.current && !notifPopupRef.current.contains(event.target)) {
        setShowNotificationPopup(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const togglePopup = (event) => {
    if (event) event.preventDefault();
    setShowPopup((prev) => !prev);
  };

  const togglePasswordPopup = () => {
    setShowPasswordPopup((prev) => !prev);
  };
  
  const toggleNotificationPopup = () => {
    setShowNotificationPopup((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setShowPopup(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/logout");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  
  // Mark all notifications as read
  const handleMarkAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({
      ...notif,
      isRead: true
    }));
    setNotifications(updatedNotifications);
  };
  
  // Handle clicking on a notification
  const handleNotificationClick = (e, notif) => {
    e.stopPropagation();
    // Mark this notification as read
    if (!notif.isRead) {
      setNotifications(
        notifications.map(n => 
          n.id === notif.id ? { ...n, isRead: true } : n
        )
      );
    }
    setSelectedNotification(notif);
    setShowNotificationPopup(false);
  };

  return (
    <Navbar expand="lg" className="header py-2">
      <Row className="align-items-center w-100">
        {/* Left Section: Logo and Menu Toggle (for mobile) */}
        <Col xs={4} md={3} className="d-flex align-items-center header-left">
          {isMobile ? (
            <>
            <Button 
  variant="link" 
  onClick={() => {
    toggleSidebar(); // Add this to toggle the sidebar
     
  }} 
  className="menu-btn"
>
  <RiMenu3Line size={ICON_SIZE} />
</Button>
              <Link to="/teacherDashboard">
                <img src={logo} alt="Math Gym Logo" className="logo" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/teacherDashboard">
                <img src={logo} alt="Math Gym Logo" className="logo" />
              </Link>
              <Navbar.Brand className="text-success fw-bold ms-3 brand-info">
                <div className="brand-title">MATH GYM</div>
                <div className="brand-subtitle">Flex Your Brain</div>
              </Navbar.Brand>
            </>
          )}
        </Col>

        {/* Center Section: Welcome Message (Desktop only) */}
        {!isMobile && (
          <Col md={5} className="text-center">
            <span className="fw-bold welcome-message">
              Welcome, Teacher <span role="img" aria-label="wave">👋</span>
            </span>
          </Col>
        )}

        {/* Right Section: Notification and Profile Icons */}
        <Col className="d-flex justify-content-end align-items-center headerIcon-group" style={{marginRight:"29px"}}>
          <div className="position-relative" ref={notifPopupRef} >
            <Button variant="link" title="Notification" onClick={toggleNotificationPopup}>
              <Badge badgeContent={unreadCount} color="secondary" overlap="circular">
                <RiNotification3Line size={ICON_SIZE} className="header-icon" />
              </Badge>
            </Button>
            
            {/* Notification Popup */}
            {showNotificationPopup && (
              <div className="notification-popup">
                <h6 className="mb-2">Recent Notifications</h6>
                <ul className="list-unstyled notifications-list">
                  {lastFiveNotifications.length > 0 ? (
                    lastFiveNotifications.map((notif) => (
                      <li
                        key={notif.id}
                        onClick={(e) => handleNotificationClick(e, notif)}
                        className="notification-item"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className={notif.isRead ? "" : "font-bold"}>
                            {notif.title}
                          </span>
                          {!notif.isRead && <span className="unread-dot"></span>}
                        </div>
                        <small className="text-muted">{notif.receivedDate}</small>
                      </li>
                    ))
                  ) : (
                    <li className="text-center py-2">No notifications</li>
                  )}
                </ul>
                <div className="notification-actions">
                  <Button variant="link" onClick={() => navigate("/teachernotification")}>
                    Show More
                  </Button>
                  <Button variant="link" onClick={handleMarkAsRead}>
                    Mark as Read
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <Button variant="link" title="Website" onClick={() => window.open("https://mathgymint.com", "_blank")}>
            <RiGlobalLine size={ICON_SIZE} className="header-icon" />
          </Button>
          
          <div className="position-relative admin-container" ref={popupRef}>
            <Button variant="link" onClick={togglePopup} className="admin-btn" style={{textDecoration:'none', top:'10px'}}>
              <RiAdminLine size={ICON_SIZE} className="header-icon" />
              <span className="admin-name"><b>Teacher</b></span>
            </Button>
            
            {/* Admin/Teacher Popup Menu */}
            {showPopup && (
              <div className="admin-popup" style={{width:"150%", lineHeight:'35px'}}>
                <ul className="list-unstyled m-0 p-2">
                  <li className="dropdown-item menu-item" onClick={() => navigate("/TeacherSettings")}>
                    <RiLockPasswordLine className="popup-icon" /> Profile
                  </li>
                  <li className="dropdown-item menu-item" onClick={() => {
                    togglePasswordPopup();
                    setShowPopup(false);
                  }}>
                    <RiRestartLine className="popup-icon" /> Password
                  </li>
                  <li className="dropdown-item menu-item text-danger" onClick={handleLogoutClick}>
                    <RiLogoutCircleRLine className="popup-icon" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Mobile Menu Offcanvas (Bootstrap Component) */}
      <Offcanvas show={isMobileMenuOpen} onHide={() => setIsMobileMenuOpen(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-success">MATH GYM</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled">
            <li className="menu-item p-2 border-bottom" onClick={() => {
              navigate("/TeacherSettings");
              setIsMobileMenuOpen(false);
            }}>
              <RiLockPasswordLine className="me-2" /> Profile
            </li>
            <li className="menu-item p-2 border-bottom" onClick={() => {
              togglePasswordPopup();
              setIsMobileMenuOpen(false);
            }}>
              <RiRestartLine className="me-2" /> Password
            </li>
            <li className="menu-item p-2 border-bottom" onClick={() => {
              navigate("/teachernotification");
              setIsMobileMenuOpen(false);
            }}>
              <RiNotification3Line className="me-2" /> Notifications
              {unreadCount > 0 && (
                <Badge badgeContent={unreadCount} color="secondary" className="ms-1" />
              )}
            </li>
            <li className="menu-item p-2 text-danger" onClick={() => {
              handleLogoutClick();
              setIsMobileMenuOpen(false);
            }}>
              <RiLogoutCircleRLine className="me-2" /> Logout
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      
      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutConfirm} onHide={handleCancelLogout} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelLogout}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Password Change Popup */}
      {showPasswordPopup && <UpdatePassword onClose={togglePasswordPopup} />}
      
      {/* Notification Details Modal */}
      {selectedNotification && (
        <Modal show onHide={() => setSelectedNotification(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedNotification.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedNotification.content}</p>
            <small className="text-muted">{selectedNotification.receivedDate}</small>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedNotification(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Navbar>
  );
};

export default TeacherHeader;