import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BASE_URL from "../../redux/Services/Config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleVerifyEmail = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${BASE_URL}/PasswordManager/StudentForgotPassword?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            AccessToken: "123",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data) {
        setIsVerified(true);
        setSuccess("Please check your email.");
      } else {
        setError(data.message || "Failed to verify email.");
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h3 className="text-center">Forgot Password</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <Form>
            {/* Email Field */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isVerified} // Lock the email field if verified
                required
              />
            </Form.Group>

            {/* Verify Button */}
            {!isVerified && (
              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={handleVerifyEmail}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
            )}

            {/* Close Button */}
            <Button
              variant="secondary"
              className="w-100"
              onClick={() => navigate("/")} // Navigate to the login page
            >
              Close
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
