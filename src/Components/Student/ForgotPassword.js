import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../redux/Services/Config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${BASE_URL}/PasswordManager/StudentForgotPassword?email=${encodeURIComponent(email)}`,
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

      if (response.ok && data.isSuccess) {
        setIsVerified(true);
        setSuccess("Mail sent successfully. Please check your email.");
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg border-0 p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Forgot Password</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={isVerified}
                    required
                  />
                </Form.Group>

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

                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => navigate("/")}
                >
                  Close
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
