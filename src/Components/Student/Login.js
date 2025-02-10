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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [OldPassword, setOldPassword] = useState("");
  const [Password, setNewPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
            setShowPopup(true);
            setUserData(data.data);
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
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="bg-image">
      <Row>
        <Col xs={12} md={6} lg={4}>
          <div className="login-card">
            <div className="text-center mb-4">
              <img src={logo} alt="Math Gym Logo" className="img-fluid mb-3" />
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
                  Don’t have an account? <a href="/registerStudent" className="text-decoration-none">Sign Up</a>
                </small>
              </div>
              <div className="text-center mt-3">
                <small>
                  Forgot your password? <a href="/forgotPassword" className="text-decoration-none">Forgot Password</a>
                </small>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
