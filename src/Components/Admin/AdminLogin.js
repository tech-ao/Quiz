import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style.css";
import logo from "../../Components/images/Logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminLoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const apiUrl = `http://localhost:8012/api/Login/AdminSignin?Email=${encodeURIComponent(
        Email
      )}&Password=${encodeURIComponent(Password)}`;

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
          navigate("/adminDashboard", { state: { userData: data.data } });
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
    }
  };

  return (
    <Container
      fluid
      className="vh-100 bg1-image d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col xs={12} md={6} lg={4}>
          <div className="p-4 bg-white rounded shadow border login-card border-success">
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Math Gym Logo"
                className="img-fluid mb-3"
                style={{ width: "80px" }}
              />
              <h2 className="text-success">MATH GYM</h2>
              <p className="text-muted">Admin Login to Quizlab Dashboard</p>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 position-relative" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="position-absolute top-50 end-0 translate-middle-y"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ border: "none", background: "transparent" }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </Form.Group>
              <Button type="submit" variant="success" className="w-100">
                Login
              </Button>
              <div className="text-center mt-3">
                <small>
                  Forgot your password?{" "}
                  <a href="#!" className="text-decoration-none">
                    Reset Password
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

export default AdminLoginPage;
