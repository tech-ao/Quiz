import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Dropdown,
} from "react-bootstrap";
import {
  FaBook,
  FaFileAlt,
  FaCalendar,
  FaBookOpen,
  FaPrint,
  FaShareAlt,
} from "react-icons/fa";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [sortBy, setSortBy] = useState("Recently");
  const [transactions, setTransactions] = useState([
    {
      purpose: "Fauget Cafe",
      type: "Coffee Shop",
      date: "Today",
      timeAgo: "2m ago",
      amount: 500,
      paymentType: "QR Code",
      status: "Done",
      timestamp: new Date().getTime() - 2 * 60 * 1000,
    },
    {
      purpose: "Claudia Store",
      type: "Accessories",
      date: "Today",
      timeAgo: "5m ago",
      amount: 1000,
      paymentType: "Transfer",
      status: "Done",
      timestamp: new Date().getTime() - 5 * 60 * 1000,
    },
    {
      purpose: "Chidi Barber",
      type: "Barber Shop",
      date: "Today",
      timeAgo: "1h ago",
      amount: 500,
      paymentType: "QR Code",
      status: "Done",
      timestamp: new Date().getTime() - 60 * 60 * 1000,
    },
    {
      purpose: "King's",
      type: "Coffe Shop",
      date: "Today",
      timeAgo: "8h ago",
      amount: 120,
      paymentType: "QR Code",
      status: "Done",
      timestamp: new Date().getTime() - 8* 60 * 1000,
    },
    {
      purpose: "NKM Furniture",
      type: "Furniture",
      date: "Yesturday",
      timeAgo: "1h ago",
      amount: 500,
      paymentType: "QR Code",
      status: "Done",
      timestamp: new Date().getTime() - 30 * 80 * 1000,
    },
    {
      purpose: "Black Suits",
      type: "Clothes",
      date: "Today",
      timeAgo: "2days ago",
      amount: 1500,
      paymentType: "QR Code",
      status: "Done",
      timestamp: new Date().getTime() - 10 * 20 * 1000,
    },
    {
      purpose: "Wilde Bears",
      type: "Choclate Shop",
      date: "Yesturday",
      timeAgo: "8h ago",
      amount: 300,
      paymentType: "QR Code",
      status: "Done",
      timestamp: new Date().getTime() - 50 * 60 * 1000,
    },
  ]);

  const statsData = [
    { title: "Total Students", count: "10", icon: FaBook },
    { title: "Leave Application", count: "05", icon: FaFileAlt },
    { title: "Upcoming Classes", count: "32", icon: FaCalendar },
    { title: "Assignment", count: "17", icon: FaBookOpen },
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sortedTransactions = [...transactions];

    switch (sortType) {
      case "Recently":
        sortedTransactions.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case "Oldest":
        sortedTransactions.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case "Amount (High-Low)":
        sortedTransactions.sort((a, b) => b.amount - a.amount);
        break;
      case "Amount (Low-High)":
        sortedTransactions.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }

    setTransactions(sortedTransactions);
  };

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 mx-auto">
          <div className="sub-container dashboard-container">
            <Row
              className="mt-4 g-4"
              style={{ paddingRight: "86px", paddingTop: "39px" }}
            >
              {/* Stats Cards */}
              <Col xs={12} lg={5} xl={4} className="box-details">
                {statsData.map((stat, index) => (
                  <div key={index} className="mb-4 my-1">
                    <Card className="stats-card border-0">
                      <Card.Body className="d-flex align-items-center bg-mint-green rounded p-3">
                        <stat.icon
                          size={24}
                          className="stats-icon me-3 mt-n2"
                        />
                        <div style={{ padding: "5px" }}>
                          <div className="stats-title">{stat.title}</div>
                          <div className="stats-count">{stat.count}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Col>

              {/* Payment History */}
              <Col xs={12} lg={7} xl={8}>
                <Card className="payment-card border-0 h-100">
                  <Card.Body>
                    {/* Payment History Header */}
                    <div className="payment-history-header">
                      <div className="payment-title-section">
                        <h5>Payment History</h5>
                        <div className="sort-section">
                          <span className="sort-label">Sort by</span>
                          <Dropdown className="sort-dropdown">
                            <Dropdown.Toggle>{sortBy} ▾</Dropdown.Toggle>
                            <Dropdown.Menu>
                              {[
                                "Recently",
                                "Oldest",
                                "Amount (High-Low)",
                                "Amount (Low-High)",
                              ].map((option) => (
                                <Dropdown.Item
                                  key={option}
                                  onClick={() => handleSort(option)}
                                  active={sortBy === option}
                                >
                                  {option}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="icon-container">
                        <Button className="icon-only-button me-2">
                          <FaPrint className="icon-only" />
                          <span className="button-text">Print</span>
                        </Button>
                        <Button className="icon-only-button">
                          <FaShareAlt className="icon-only" />
                          <span className="button-text">Share</span>
                        </Button>
                      </div>
                    </div>

                    {/* Transaction Table */}
                    <div className="table_container">
                      <Table responsive className="payment-table" style={{width:'100px'}}>
                        <thead>
                          <tr className="bg-dark-green text-white">
                            <th className="py-3">Purpose</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Amount</th>
                            <th className="py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction, index) => (
                            <tr key={index}>
                              <td>
                                <div>{transaction.purpose}</div>
                                <small className="text-muted">
                                  {transaction.type}
                                </small>
                              </td>
                              <td>
                                <div>{transaction.date}</div>
                                <small className="text-muted">
                                  {transaction.timeAgo}
                                </small>
                              </td>
                              <td>
                                <div>$ {transaction.amount}</div>
                                <small className="text-muted">
                                  {transaction.paymentType}
                                </small>
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    transaction.status === "Done"
                                      ? "bg-success"
                                      : "bg-warning"
                                  } rounded-pill`}
                                >
                                  {transaction.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    <div className="text-center mt-4">
                      <a href="#" className="text-primary text-decoration-none">
                        Show All My Transactions
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherDashboard;
