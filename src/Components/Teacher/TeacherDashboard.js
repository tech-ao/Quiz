import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "./TeacherDashboard.css";
import { fetchDashboardContent } from "../../redux/Services/Enum";
import { getTeacher } from "../../redux/Services/api";

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [teacherId, setTeacherId] = useState(null);  
  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState({});
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 992);
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
    }
  ]);

  console.log(teacherData);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboardContent();
        setDashboardData(data?.data || {});
      } catch (error) {
        console.error("Error fetching teacher dashboard data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  //  useEffect(() => {
  //     if (!teacherId) {
  //       setLoading(false); // Stop loading if no teacherId
  //       return;
  //     }
  
  //     const fetchAllData = async () => {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         const teacherResponse = await getTeacher(teacherId);
  //         setTeacherData(teacherResponse.data);
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchAllData();
  //   }, [teacherId, dispatch]);

  useEffect(() => {
    const teacherData = location.state;
    if (teacherData) {
      localStorage.setItem("teacherData", JSON.stringify(teacherData)); // Store as a string
      setTeacherId(teacherData?.userData.teacherId);
      setTeacherData(teacherData?.userData)
      console.log(teacherData );
      console.log(teacherId);
      
    } else {
      const storedTeacherData = localStorage.getItem("teacherData");
      if (storedTeacherData) {
        setTeacherData(JSON.parse(storedTeacherData)); // Convert back to object
      } else {
        setError("Teacher data is missing");
        setLoading(false);
      }
    }
  }, [location.state]);
 
  // Stats data with routing paths
  const statsData = [
    { title: "Total Students", count: dashboardData?.studentsCount || 22, icon: FaBook, path: "/studentdata" },
    { title: "Leave Applications", count: dashboardData?.leaveApplications || 3, icon: FaFileAlt, path: "/approvedleave" },
    { title: "Upcoming Classes", count: dashboardData?.upcomingClasses || 8, icon: FaCalendar, path: "/assignclass" },
    { title: "Assignments", count: dashboardData?.assignmentsCount || 10, icon: FaBookOpen, path: "/assignment" },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isMdLayout, setIsMdLayout] = useState(window.innerWidth >= 768 && window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 992);
      setIsSmallScreen(window.innerWidth < 768);
      setIsMdLayout(window.innerWidth >= 768 && window.innerWidth < 992);
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
      <TeacherHeader toggleSidebar={toggleSidebar} teacherName ={teacherData?.userData?.name} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="teacher-main-container p-4 mx-auto">
          <div className="sticky-title align-items-center mb-4">
            <h2 className="fw-bold text-left">Teacher Dashboard</h2>
          </div>
          <div className="teacher-sub-container dashboard-container">
            {isMdLayout ? (
              <>
                <Row className="g-3 dashboard-row mx-1">
                  {statsData.map((stat, index) => (
                    <Col xs={12} md={6} key={index} className="px-1">
                      <Card
                        className="stats-card border-0"
                        onClick={() => handleCardClick(stat.path)}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Body className="d-flex align-items-center bg-mint-green rounded p-3">
                          <stat.icon size={24} className="stats-icon me-3 mt-n2" />
                          <div style={{ padding: "5px" }}>
                            <div className="stats-title">{stat.title}</div>
                            <div className="stats-count">{stat.count}</div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row className="mt-4 mx-1">
                  <Col xs={12} className="px-1">
                    <Card className="payment-card border-0 h-100">
                      <Card.Body>
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

                        <div className="table_container">
                          <Table responsive="md" className="payment-table">
                            <thead className="payment-table-head">
                              <tr className="bg-dark-green text-white">
                                <th className="py-0">Purpose</th>
                                <th className="py-0">Date</th>
                                <th className="py-0">Amount</th>
                                <th className="py-0">Status</th>
                              </tr>
                            </thead>
                            <tbody className="payment-table-data">
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
                                    <div className=".status-cell-right "> {/* Right alignment */}
                                      <span
                                        className={`badge ${transaction.status === "Done"
                                            ? "bg-success"
                                            : "bg-warning"
                                          } rounded-pill`}
                                      >
                                        {transaction.status}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>

                        <div className="text-center mt-4">
                          <a
                            href="#"
                            className="text-primary text-decoration-none"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/paymentHistory");
                            }}
                          >
                            Show All My Transactions
                          </a>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="g-4 dashboard-row mx-1">
                <Col xs={12} lg={5} md={6} xl={4} className="box-details px-1">
                  {statsData.map((stat, index) => (
                    <div key={index} className="mb-4 my-1">
                      <Card
                        className="stats-card border-0"
                        onClick={() => handleCardClick(stat.path)}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Body className="d-flex align-items-center bg-mint-green rounded p-3">
                          <stat.icon size={24} className="stats-icon me-3 mt-n2" />
                          <div style={{ padding: "5px" }}>
                            <div className="stats-title">{stat.title}</div>
                            <div className="stats-count">{stat.count}</div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </Col>
                <Col xs={12} lg={7} xl={8} className="px-1">
                  <Card className="payment-card h-100">
                    <Card.Body>
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
                          <Button className="icon-only-button me1">
                            <FaPrint className="icon-only" />
                            <span className="button-text">Print</span>
                          </Button>
                          <Button className="icon-only-button">
                            <FaShareAlt className="icon-only" />
                            <span className="button-text">Share</span>
                          </Button>
                        </div>
                      </div>
                      <div className="table_container">
                        <Table responsive="md" className="payment-table">
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
                                    className={`badge ${transaction.status === "Done"
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
                        <a
                          href="#"
                          className="text-primary text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/paymentHistory");
                          }}
                        >
                          Show All My Transactions
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherDashboard;