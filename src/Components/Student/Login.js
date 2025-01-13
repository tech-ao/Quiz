import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import BASE_URL from "../../redux/Services/Config";
import "./Login.css";
import logo from "../../Components/images/Logo.png";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [OldPassword, setOldPassword] = useState(""); // Old password
  const [Password, setNewPassword] = useState(""); // New password
  const [userData, setUserData] = useState(null); // To store user data when login is successful
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isHuman) {
      setError("Please confirm that you are human.");
      setLoading(false);
      return;
    }

    try {
      const apiUrl =
        role === "Student"
          ? `${BASE_URL}/Login/StudentSignin?Email=${encodeURIComponent(
              userId
            )}&Password=${encodeURIComponent(password)}`
          : `${BASE_URL}/Login/TeacherSignin?Email=${encodeURIComponent(
              userId
            )}&Password=${encodeURIComponent(password)}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
       

        if (data && data.isSuccess) {
          if (data.data.isFirstLogin) {
            setStudentId(data.data.studentId);
            // Show popup for first login, no navigation
            setShowPopup(true);
            setUserData(data.data); // Store user data for password change flow
          } else {
            console.log("Login Successful:", data);

            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userRole", role);

            const dashboardPath =
              role === "Student" ? "/studentDashboard" : "/TeacherDashboard";
            navigate(dashboardPath, { state: { userData: data.data } });
          }
        } else {
          setError("Invalid username or password.");
        }
      } else {
        const errorData = await response.json();
        setError( "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const changePasswordUrl = `${BASE_URL}/PasswordManager/StudentChangePassword?StudentId=${studentId}&Password=${encodeURIComponent(
        Password
      )}&OldPassword=${encodeURIComponent(OldPassword)}`;
      const response = await fetch(changePasswordUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
        },
          });

      const data = await response.json();
      if (response.ok && data.isSuccess) {
        setShowPopup(false);
        alert("Password changed successfully! Please log in again.");
        navigate("/"); // Redirect to login page after password change
      } else {
        setError(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const getSignUpLink = () => {
    return role === "Student" ? "/registerStudent" : "/registerTeacher";
  };

  return (
    <Container fluid className="bg-image">
      <Row>
        <Col xs={12} md={6} lg={4}>
          <div className="login-card">
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Math Gym Logo"
                className="img-fluid mb-3"
              />
              <h2 className="text-success">MATH GYM</h2>
              <p className="text-muted">FLEX YOUR BRAIN</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="userRole">
                <Form.Label className="d-flex">Select Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="userId">
                <Form.Label className="d-flex">User ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 position-relative" controlId="password">
                <Form.Label className="d-flex">Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="position-absolute top-50 end-0"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ border: "none", background: "transparent" }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </Form.Group>
              <Form.Group controlId="formHumanCheck" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="I am a human"
                  checked={isHuman}
                  onChange={() => setIsHuman(!isHuman)}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center mt-3">
                <small>
                  Don’t have an account?{" "}
                  <a href={getSignUpLink()} className="text-decoration-none">
                    Sign Up
                  </a>
                </small>
              </div>
              <div className="text-center mt-3">
                <small>
                  Do you forgot your password?{" "}
                  <a href= '/forgotPassword' className="text-decoration-none">
                    Forgot Password
                  </a>
                </small>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Password Change Popup */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="OldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                value={OldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={Password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlePasswordChange}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginPage;
