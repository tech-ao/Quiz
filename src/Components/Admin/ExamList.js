import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Table, Pagination, Button } from "react-bootstrap";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../../redux/Services/Config";

const COMMON_HEADERS = {
    Accept: "text/plain",
    "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
    AccessToken: "123",
    "Content-Type": "application/json",
  };
  
  const getHeaders = () => ({
    ...COMMON_HEADERS,
  });

const ExamList = () => {
  const [examList, setExamList] = useState([]);
  const [filteredExamList, setFilteredExamList] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);

  const [filterStatus, setFilterStatus] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const fetchExamList = async (pageNumber = 1) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/SearchAndList/SearchAndListExams`, 
        {
         
          paginationDetail: {
            pageSize: pageSize,
            pageNumber: pageNumber,
          },
        },
        { headers: getHeaders() } // Use the getHeaders function to pass the headers
      );
      const result = response.data?.data?.searchAndListExamResults || [];
      setExamList(result);
      setFilteredExamList(result);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch exam list.");
    }
  };

  useEffect(() => {
    fetchExamList();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === "") {
      setFilteredExamList(examList);
    } else {
      const filtered = examList.filter((exam) => exam.examStatus === status);
      setFilteredExamList(filtered);
    }
    setCurrentPage(1); // Reset to first page after filter
  };

  // Pagination logic
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentData = filteredExamList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredExamList.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            <h2>Student Exam List</h2>

            {/* Filter Section */}
            <Row className="mt-4 mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Filter by Status</Form.Label>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => handleFilterChange(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Completed">Completed</option>
                    <option value="In Complete">In Complete</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Table */}
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Center Name</th>
                  <th>Level</th>
                  <th>Total Questions</th>
                  <th>Answered</th>
                  <th>Correct</th>
                  <th>Wrong</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((exam, index) => (
                    <tr key={exam.examId || index}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{exam.studentName}</td>
                      <td>{exam.centerName}</td>
                      <td>{exam.level}</td>
                      <td>{exam.totalQuestions}</td>
                      <td>{exam.answeredQuestions}</td>
                      <td>{exam.correctAnswers}</td>
                      <td>{exam.wrongAnswers}</td>
                      <td>{exam.examStatusName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No exams available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ExamList;
