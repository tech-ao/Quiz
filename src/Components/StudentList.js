import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Sidebar from './SidePannel';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import AdminHeader from './AdminHeader';
import { Container, Row, Col, Button, Table, Form, InputGroup, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import ViewStudentPanel from './ViewStudent';
import { useSelector, useDispatch } from "react-redux";
import { getStudents, fetchStudent } from "../redux/Action/StudentAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
  const { students, loading, error } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const studentsPerPage = 10;

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredStudents = (Array.isArray(students?.users) ? students.users : []).filter((student) =>
    [student.firstName, student.email]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const currentStudents = filteredStudents.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

  const handleOpenAddStudent = () => setShowAddStudent(true);
  const handleCloseAddStudent = () => setShowAddStudent(false);

  const handleOpenEditStudent = (studentId) => {
    setSelectedStudentId(studentId);
    dispatch(fetchStudent(studentId));
    setShowEditStudent(true);
  };

  const handleCloseEditStudent = () => {
    setShowEditStudent(false);
    setSelectedStudentId(null);
  };

  const handleOpenViewStudent = (studentId) => {
    setSelectedStudentId(studentId);
    dispatch(fetchStudent(studentId));
    setShowViewStudent(true);
  };

  const handleCloseViewStudent = () => {
    setShowViewStudent(false);
    setSelectedStudentId(null);
  };

  const handleOpenDeleteModal = (studentId) => {
    setSelectedStudentId(studentId);
    setShowDeleteModal(true);
  };

  const handleDeleteStudent = () => {
    console.log("Student deleted!", selectedStudentId);
    setShowDeleteModal(false);
    setSelectedStudentId(null);
    // Add dispatch logic to delete the student
    toast.success("Student deleted successfully!");
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedStudentId(null);
  };

  return (
    <div>
      <AdminHeader />
      <div className="d-flex">
        <Sidebar />
        <Container fluid className="p-4 bg-light min-vh-100">
          <div className="sub-container">
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
                <Button variant="outline-success" onClick={handleOpenAddStudent}>
                  Add Student
                </Button>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{`${student.firstName} ${student.lastName}`}</td>
                        <td>{student.email}</td>
                        <td>{student.dob || 'N/A'}</td>
                        <td>{student.phoneNumber}</td>
                        <td>
                        <div className="d-flex">
                          <div className="icon-button-container">
                            <Button variant="outlined" size="sm" className="icon-button" onClick={()=>handleOpenEditStudent(student._id)}>
                              <FaEdit className="icon" />
                            </Button>
                            <span className="tooltip-text">Edit</span>
                          </div>
                          <div className="icon-button-container">
                            <Button variant="outlined" size="sm" className="icon-button" onClick={()=>handleOpenDeleteModal(student._id)}>
                              <FaTrash className="icon" />
                            </Button>
                            <span className="tooltip-text">Delete</span>
                          </div>
                          <div className="icon-button-container">
                            <Button variant="outlined" size="sm" className="icon-button" onClick={()=>handleOpenViewStudent(student._id)}>
                              <FaEye className="icon" />
                            </Button>
                            <span className="tooltip-text">View</span>
                          </div>
                        </div>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
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
                pageRangeDisplayed={10}
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
          </div>
        </Container>
      </div>

      {/* Modals */}
      <AddStudent show={showAddStudent} onClose={handleCloseAddStudent} />
      <EditStudent show={showEditStudent} onClose={handleCloseEditStudent} />
      <ViewStudentPanel show={showViewStudent} onClose={handleCloseViewStudent} />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteStudent}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentList;
