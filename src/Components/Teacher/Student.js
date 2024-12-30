import React, { useState, useEffect } from 'react';
import TeacherSidePanel from './TeacherSidepannel';
import AddStudent from '../Student/AddStudent';
import EditStudent from '../Student/EditStudent';
import AdminHeader from '../Admin/AdminHeader';
import { Container, Row, Col, Button, Table, Form, InputGroup, Modal, Dropdown } from 'react-bootstrap';
import ViewStudentPanel from '../Student/ViewStudent';
import { useSelector, useDispatch } from "react-redux";
import { getStudents, fetchStudent, deleteStudentAction } from "../../redux/Action/StudentAction";
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Danger':
      return 'error';
    case 'Inactive':
      return 'warning';
    default:
      return 'default';
  }
};

const Students = () => {
   const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  
    const toggleSidebar = () => {
      setIsSidebarVisible((prev) => !prev);
    };
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setIsSidebarVisible(true); // Show sidebar by default on desktop
        } else {
          setIsSidebarVisible(false); // Hide sidebar by default on mobile
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const { students, loading, error } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const studentsPerPage = 15;

  useEffect(() => {
    const paginationDetail = {
      pageSize: studentsPerPage,
      pageNumber: currentPage + 1,
    };
    dispatch(getStudents({ paginationDetail }));
  }, [dispatch, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  const filteredStudents = Array.isArray(students?.data?.searchAndListStudentResult)
    ? students.data.searchAndListStudentResult.filter((student) =>
      [student.firstName, student.email]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    : [];

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

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedStudentId(null);
  };

  const handleDeleteStudent = () => {
    if (!selectedStudentId) return;
    dispatch(deleteStudentAction(selectedStudentId))
      .then(() => {
        toast.success("Student deleted successfully!");
        dispatch(getStudents({ paginationDetail: { pageSize: studentsPerPage, pageNumber: currentPage + 1 } }));
        setShowDeleteModal(false);
        setSelectedStudentId(null);
      })
      .catch(() => {
        toast.error("Failed to delete the student.");
      });
  };

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="align-items-center mb-4">
              <Col md={6}>
                <h2 className="fw-bold">Student List</h2>
              </Col>
              <Col md={6} className="d-flex justify-content-between align-items-center">
                <InputGroup style={{ width: '70%' }}>
                  <Form.Control
                    placeholder="Search students by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </InputGroup>
                <Button variant="outline-success" onClick={handleOpenAddStudent}>
                  <i className="bi bi-person-plus me-2"></i> Add Student
                </Button>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Register Number</th>
                    <th>Student Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date of Birth</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={student.studentId || index}>
                        <td>{index + 1}</td>
                        <td>{student.registerNumber}</td>
                        <td>{`${student.firstName} ${student.lastName}`}</td>
                        <td>{student.genderName}</td>
                        <td>{student.email}</td>
                        <td>{student.phoneNumber}</td>
                        <td>{new Date(student.dob).toLocaleDateString('en-GB')}</td>
                        <td>{student.gradeName}</td>
                        <td>{student.statusName}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${student.studentId}`}>
                              Actions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleOpenViewStudent(student.studentId)}>
                                <i className="bi bi-eye me-2"></i>View
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleOpenEditStudent(student.studentId)}>
                                <i className="bi bi-pencil me-2"></i>Edit
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleOpenDeleteModal(student.studentId)}>
                                <i className="bi bi-trash me-2"></i>Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
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

      <AddStudent show={showAddStudent} onClose={handleCloseAddStudent} />
      <EditStudent show={showEditStudent} onClose={handleCloseEditStudent} selectedStudentId={selectedStudentId} />
      <ViewStudentPanel show={showViewStudent} onClose={handleCloseViewStudent} />

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this student?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteStudent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Students;
