import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table, Pagination } from "react-bootstrap";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { questionGenerateAction, getListOfQuestions } from "../../redux/Services/Enum";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddQuestion = () => {
  const [numberOfQn, setNumberOfQn] = useState("");
  const [rangePerQn, setRangePerQn] = useState("");
  const [formLevel, setFormLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 15;

  const fetchQuestions = async () => {
    try {
      const allQuestions = [];
      for (let level = 1; level <= 6; level++) {
        const response = await getListOfQuestions(level);
        allQuestions.push(...response.data?.questions);
      }
      setQuestions(allQuestions);
      setFilteredQuestions(allQuestions);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch questions.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAutoGenerate = async () => {
    if (!numberOfQn || !rangePerQn) {
      toast.error("Please fill all fields before generating questions.");
      return;
    }

    try {
      const payload = { numberOfQn, rangePerQn, level: formLevel };
      await questionGenerateAction(payload);
      fetchQuestions();
      resetForm();
      toast.success("Questions auto-generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate questions");
    }
  };

  const filterQuestionsByLevel = (level) => {
    setFormLevel(level);
    const filtered = questions.filter((q) => q.level === level);
    setFilteredQuestions(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const resetForm = () => {
    setNumberOfQn("");
    setRangePerQn("");
    setFormLevel(1);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

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
            <h2>Auto Generate Questions</h2>

            {/* Auto Generate Form */}
            <Row className="mt-4">
              <Col>
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Number of Questions</Form.Label>
                      <Form.Control
                        type="number"
                        value={numberOfQn}
                        onChange={(e) => setNumberOfQn(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Range Per Question</Form.Label>
                      <Form.Control
                        type="text"
                        value={rangePerQn}
                        onChange={(e) => setRangePerQn(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Level</Form.Label>
                      <Form.Select
                        value={formLevel}
                        onChange={(e) => setFormLevel(Number(e.target.value))}
                      >
                        {[...Array(6).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            Level {i + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3} className="d-flex align-items-end justify-content-end">
                    <Button variant="success" onClick={handleAutoGenerate}>
                      Auto Generate
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Filter Questions by Level */}
            <Row className="mt-4">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Filter by Level</Form.Label>
                  <Form.Select
                    value={formLevel}
                    onChange={(e) => filterQuestionsByLevel(Number(e.target.value))}
                  >
                    {[...Array(6).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        Level {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Questions Table */}
            <h4 className="mt-5">Generated Questions (Level {formLevel})</h4>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {currentQuestions.length > 0 ? (
                  currentQuestions.map((q, index) => (
                    <tr key={q.questionId || index}>
                      <td>{indexOfFirstQuestion + index + 1}</td>
                      <td>{q.questions}</td>
                      <td>{q.answer}</td>
                      <td>{q.level}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No questions available
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

export default AddQuestion;
