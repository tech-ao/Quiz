import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Style.css'
import logo from "../Components/images/Logo.png"; // Update the path as needed
import { FiEye, FiEyeOff } from "react-icons/fi";


const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User ID:", userId, "Password:", password);
  };

  return (
    <Container fluid className="vh-100 bg-image d-flex justify-content-center align-items-center">
      <Row>
        <Col xs={12} md={6} lg={4}>
          <div className="p-4 bg-white rounded shadow border login-card border-success">
            <div className="text-center mb-4">
              <img src={logo} alt="Math Gym Logo" className="img-fluid mb-3" style={{ width: "80px" }} />
              <h2 className="text-success">MATH GYM</h2>
              <p className="text-muted">FLEX YOUR BRAIN</p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="userId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 position-relative" controlId="password">
                <Form.Label>Password</Form.Label>
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
                  className="position-absolute top-50 end-0 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>

              </Form.Group>
              <div className="d-flex justify-content-end mb-3">
                <a href="#!" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>
              <Button type="submit" variant="success" className="w-100">
                Login
              </Button>
              <div className="text-center mt-3">
                <small>
                  Don’t have an account?{" "}
                  <a href="#!" className="text-decoration-none">
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
