import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Sidebar from './SidePannel';
import AddStudent from './AddStudent'
import EditStudent from './EditStudent';
import AdminHeader from './AdminHeader'
import { Container, Row, Col, Button, Table, Form, InputGroup } from 'react-bootstrap';

const StudentList = ({ students = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showAddStudent, setShowAddStudent] = useState(false); 
  const [showEditStudent, setShowEditStudent] = useState(false); 
  const studentsPerPage = 5;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset pagination on search
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOpenAddStudent = () => setShowAddStudent(true); 
  const handleCloseAddStudent = () => setShowAddStudent(false); 
  const handleOpenEditStudent = () => setShowEditStudent(true); 
  const handleCloseEditStudent = () => setShowEditStudent(false); 

  const filteredStudents = students.filter((student) =>
    [student.username, student.email]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const currentStudents = filteredStudents.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

  return (
    <div>
    <AdminHeader />
    <div className="d-flex">
        <Sidebar />
    <Container fluid className="p-4 bg-light min-vh-100">
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <h2 className="fw-bold">Student List</h2>
          </Col>
          
        </Row>
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Search students by name or email"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-end gap-3">
            <Button variant="outline-secondary" onClick={handleOpenAddStudent}>
              Add Student
            </Button>
            <Button variant="outline-secondary">Add Quiz</Button>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table hover className="mb-0">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.username}</td>
                    <td>{student.email}</td>
                    <td>{student.dob || 'N/A'}</td>
                    <td>{student.phone}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={handleOpenEditStudent}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={handleOpenEditStudent}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            pageCount={Math.ceil(filteredStudents.length / studentsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLabel="&laquo;"
            nextLabel="&raquo;"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        </div>
      </Container>
      <AddStudent show={showAddStudent} onClose={handleCloseAddStudent} />
      <EditStudent show={showEditStudent} onClose={handleCloseEditStudent} />
    </div>
    </div>
  );
};

export default StudentList;
