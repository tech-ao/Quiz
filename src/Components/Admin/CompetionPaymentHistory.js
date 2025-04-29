import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Badge } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../../redux/Services/Config";

const CompetionPaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const COMMON_HEADERS = {
    Accept: "text/plain",
    "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
    AccessToken: "123",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ExamPayments/GetAll`, {
          headers: COMMON_HEADERS,
        });

        if (response.data?.isSuccess) {
          setPaymentData(response.data.data || []);
        } else {
          setError("Failed to fetch payment history.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Payment History</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Schedule ID</th>
              <th>Student ID</th>
              <th>Document Name</th>
              <th>Extension</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.scheduleId}</td>
                <td>{payment.studentId}</td>
                <td>{payment.name}</td>
                <td>
                  <Badge bg="secondary">{payment.extension}</Badge>
                </td>
                <td>{new Date(payment.timeStamp).toLocaleString()}</td>
                <td>
                  {payment.isDeleted ? (
                    <Badge bg="danger">Deleted</Badge>
                  ) : (
                    <Badge bg="success">Active</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CompetionPaymentHistory;
