import React, { useState } from "react";
import BASE_URL from "../../redux/Services/Config";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css"; // Import the new CSS file
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
    setError("");

    try {
      const apiUrl = `${BASE_URL}/Login/AdminSignin?Email=${encodeURIComponent(
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
          sessionStorage.setItem('isLoggedIn', 'true');
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
    <Container fluid className="bg1-image">
    <Row className=" align-items-center ">
      <Col xs={12} sm={10} md={8} lg={5}>
        <div className="login-card">
          <div className="text-center mb-4">
            <img src={logo} alt="Math Gym Logo" className="img-fluid mb-3" />
            <h2>MATH GYM</h2>
            <p>Admin Login to Quizlab Dashboard</p>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label className="d-flex">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 position-relative" controlId="Password">
              <Form.Label className="d-flex">Password</Form.Label>
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
                className="position-absolute top-50 end-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </Button>
            </Form.Group>
            <Button type="submit" variant="success" className="">
              Login
            </Button>
            
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
  );
};

export default AdminLoginPage;
