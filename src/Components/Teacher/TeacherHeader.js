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
import "./TeacherHeader.css";
import UpdatePassword from "../Student/UpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../../redux/Action/StudentAction";

const TeacherHeader = ({ toggleSidebar , teacherName }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  // Notification state and selected notification for details
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Notification 1",
      content: "Details of notification 1",
      receivedDate: "2024-02-15",
      isRead: false,
    },
    {
      id: 2,
      title: "Notification 2",
      content: "Details of notification 2",
      receivedDate: "2024-02-16",
      isRead: false,
    },
    {
      id: 3,
      title: "Notification 3",
      content: "Details of notification 3",
      receivedDate: "2024-02-17",
      isRead: false,
    },
    {
      id: 4,
      title: "Notification 4",
      content: "Details of notification 4",
      receivedDate: "2024-02-18",
      isRead: true,
    },
    {
      id: 5,
      title: "Notification 5",
      content: "Details of notification 5",
      receivedDate: "2024-02-19",
      isRead: false,
    },
    {
      id: 6,
      title: "Notification 6",
      content: "Details of notification 6",
      receivedDate: "2024-02-20",
      isRead: false,
    },
  ]);
  const [selectedNotification, setSelectedNotification] = useState(null);

   // Responsive state: "isMobileOrTablet" is true if width < 992px
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth < 992);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const notifPopupRef = useRef(null);

  const { selectedAdmin } = useSelector((state) => state.admin || {});
  const adminFullName = selectedAdmin?.data
    ? `${selectedAdmin.data.firstName} ${selectedAdmin.data.lastName}`
    : "Admin";

  const togglePopup = () => setShowPopup((prev) => !prev);
  const togglePasswordPopup = () => setShowPasswordPopup((prev) => !prev);
  const toggleNotificationPopup = () =>
    setShowNotificationPopup((prev) => !prev);

  // Calculate unread notifications for the badge
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
     // Update isMobile and isMobileOrTablet on window resize
     const handleResize = () => {
       setIsMobile(window.innerWidth < 768);
       setIsMobileOrTablet(window.innerWidth < 1024);
     };
     window.addEventListener("resize", handleResize);
 
     const storedStudentId = localStorage.getItem("studentId");
     if (storedStudentId) {
       dispatch(fetchStudent(storedStudentId));
     }
     const handleClickOutside = (event) => {
       if (popupRef.current && !popupRef.current.contains(event.target)) {
         setShowPopup(false);
       }
       if (notifPopupRef.current && !notifPopupRef.current.contains(event.target)) {
         setShowNotificationPopup(false);
       }
     };
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       window.removeEventListener("resize", handleResize);
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, [dispatch]);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentId");
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Mark all notifications as read
  const handleMarkAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Get the last five notifications (assuming they are sorted by date)
  const lastFiveNotifications = notifications.slice(-5);

  // Handle clicking on a notification item to show its details
  const handleNotificationClick = (e, notif) => {
    e.stopPropagation();
    if (!notif.isRead) {
      setNotifications(
        notifications.map((n) =>
          n.id === notif.id ? { ...n, isRead: true } : n
        )
      );
    }
    setSelectedNotification(notif);
  };

  return (
    <Navbar expand="lg" className="header py-2">
      <Row className="align-items-center w-100 head-container">
        {/* Left Section: Logo and (for mobile) menu button */}
        <Col xs={3} md={3} className="d-flex align-items-center header-left">
          {isMobileOrTablet? (
            isMobileExpanded ? (
              <>
                <Link to="/" style={{ marginLeft: "-10px" }}>
                  <img src={logo} alt="Math Gym Logo" className="logo" />
                </Link>
                <Button
                  variant="link"
                  onClick={() => {
                    setIsMobileExpanded(false);
                    toggleSidebar();
                  }}
                  className="menu-btn pe0 px-1"
                  style={{ marginLeft: "-10px" }}
                >
                  <RiMenu3Line className="header-icon" />
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                onClick={() => {
                  setIsMobileExpanded(true);
                  toggleSidebar();
                }}
                className="menu-btn"
              >
                <RiMenu3Line className="header-icon" />
              </Button>
            )
          ) : (
            <>
              <Link to="/adminDashboard">
                <img src={logo} alt="Math Gym Logo" className="logo" />
              </Link>
              <Navbar.Brand className="text-success fw-bold ms-3 brand-info">
                <div className="brand-title">MATH GYM</div>
                <div className="brand-subtitle">Flex Your Brain</div>
              </Navbar.Brand>
            </>
          )}
        </Col>

        {/* Center Section: Welcome Message (desktop only) */}
        {!isMobileOrTablet && (
          <Col md={5} className="text-center">
            <span className="fw-bold welcome-message">
              Welcome, Teacher{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </span>
          </Col>
        )}

        {/* Right Section: Icons */}
        <Col
          xs={8}
          md={4}
          className="d-flex justify-content-end align-items-center header-icon-group"
          style={{ marginLeft: "-19px", gap: "0" }}
        >
          <Button
            variant="link"
            title="Notification"
            onClick={toggleNotificationPopup}
          >
            <Badge
              badgeContent={unreadCount}
              color="secondary"
              overlap="circular"
            >
              <RiNotification3Line className="header-icon" />
            </Badge>
          </Button>
          <Button
            variant="link"
            title="Website"
            onClick={() => window.open("https://mathgymint.com", "_blank")}
          >
            <RiGlobalLine className="header-icon" />
          </Button>
          <div className="position-relative admin-container" ref={popupRef}>
            <Button
              variant="link"
              onClick={togglePopup}
              className="admin-btn"
              style={{ textDecoration: "none", top: "10px" }}
            >
              <RiAdminLine className="headericon" style={{fontSize:"24px",height: isMobile ? "25px" : "25px"}}/>
              <span className="admin-name" style={{ color: "#09690c" }}>
                {teacherName}
              </span>
            </Button>
            {showPopup && (
  <div
    className="admin-popup"
    style={{ width: "140px", top: "75px" }}
  >
    <ul
      className="list-unstyled m-0 p-2"
      style={{
        color: "#09690c",
        fontSize: isMobile ? "18px":"18px",
        lineHeight: "40px",
      }}
    >
      <li
        className="dropdown-item menu-item"
        onClick={() => navigate("/teachersettings")}
      >
        <RiLockPasswordLine 
          className="popup-icon" 
          style={{ fontSize: isMobile ? "26px" : "24px" }}
        />
        <b> Profile</b>
      </li>
      <li
        className="dropdown-item menu-item"
        onClick={() => {
          togglePasswordPopup();
          setShowPopup(false);
        }}
      >
        <RiRestartLine 
          className="popup-icon" 
          style={{ fontSize: isMobile ? "26px" : "24px" }}
        /> 
        <b>Password</b>
      </li>
      <li
        className="dropdown-item menu-item text-danger"
        onClick={handleLogoutClick}
      >
        <RiLogoutCircleRLine 
          className="popup-icon"
          style={{ fontSize: isMobile ? "26px" : "24px" }}
        />
        <b> Logout</b>
      </li>
    </ul>
  </div>
)}
          </div>
        </Col>
      </Row>

      {/* Notification Popup */}
      {showNotificationPopup && (
        <div className="notification-popup" ref={notifPopupRef}>
          <h6 className="mb-2">Recent Notifications</h6>
          <ul className="list-unstyled notifications-list">
            {lastFiveNotifications.map((notif) => (
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
            ))}
          </ul>
          <div className="notification-actions">
            <Button
              variant="link"
              onClick={() => navigate("/teachernotification")}
            >
              Show More
            </Button>
            <Button variant="link" onClick={handleMarkAsRead}>
              Mark as Read
            </Button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="logout-confirmation-popup">
          <div className="popup-content">
            <h5>Are you sure you want to logout?</h5>
            <div className="logout-actions">
              <Button variant="danger" onClick={handleLogout}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleCancelLogout}>
                No
              </Button>
            </div>
          </div>
        </div>
      )}

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
            <small className="text-muted">
              {selectedNotification.receivedDate}
            </small>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setSelectedNotification(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Navbar>
  );
};

export default TeacherHeader;
