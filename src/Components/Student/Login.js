import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Components/images/Logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import './Login.css'

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default role is Student
  const [showPassword, setShowPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      // Define the API URL based on the selected role
      const apiUrl =
        role === "Student"
          ? `http://localhost:8012/api/Login/StudentSignin?Email=${encodeURIComponent(
              userId
            )}&Password=${encodeURIComponent(password)}`
          : `http://localhost:8012/api/Login/TeacherSignin?Email=${encodeURIComponent(
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
        if (data && data.isSuccess) {
          console.log("Login Successful:", data);
          const dashboardPath =
            role === "Student" ? "/StudentDashboard" : "/TeacherDashboard";
          navigate(dashboardPath, { state: { userData: data.data } });
        } else {
          setError(data.message || "Invalid username or password.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Determine the sign-up URL based on the selected role
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
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
