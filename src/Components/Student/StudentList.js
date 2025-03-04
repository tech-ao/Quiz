import React, { useState, useEffect } from 'react';
import Sidebar from '../Admin/SidePannel';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import AdminHeader from '../Admin/AdminHeader';
import { Container, Row, Col, Button, Table, Form, InputGroup, Modal, Dropdown, Badge } from 'react-bootstrap';
import ViewStudentPanel from './ViewStudent';
import { useSelector, useDispatch } from "react-redux";
import { getStudents, fetchStudent, deleteStudentAction } from "../../redux/Action/StudentAction";
import { toast } from 'react-toastify';
import { FaFilter } from "react-icons/fa"; // Import filter icon

import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';
import "./StudentList.css"

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

const StudentList = () => {
  // For tablet view (768px to 1023px), sidebar is hidden by default (only shown for widths >=1024px)
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [selectedGrade, setSelectedGrade] = useState(null); // state for grade filter

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      // Show sidebar only for screens 1024px and above
      setIsSidebarVisible(window.innerWidth >= 1024);
      setIsSmallScreen(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
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

  const studentsPerPage = 10;

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

  // Helper function to extract the numeric grade (if gradeName is in "Level X" format)
  const extractGradeNumber = (gradeName) => {
    if (typeof gradeName === 'string' && gradeName.toLowerCase().includes('level')) {
      return gradeName.toLowerCase().replace('level', '').trim();
    }
    return gradeName.toString().trim();
  };

  // Filter students by search term and selected grade filter (if any)
  const filteredStudents = Array.isArray(students?.data?.searchAndListStudentResult)
    ? students.data.searchAndListStudentResult.filter((student) => {
        const matchesSearch = [student.firstName, student.email]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const studentGradeValue = extractGradeNumber(student.gradeName);
        const matchesGrade = selectedGrade !== null 
          ? studentGradeValue === selectedGrade.toString() 
          : true;
        return matchesSearch && matchesGrade;
      })
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
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container ">
          {/* Sticky Header */}
          <div className="sticky-top bg-white py-3" style={{ top: 0, zIndex: 1020 }}>
            {isSmallScreen ? (
              <>
                {/* Row 1: Title */}
                <Row>
                  <Col>
                    <h2 className="fw-bold">Student List</h2>
                  </Col>
                </Row>
                {/* Row 2: Search bar, Filter Icon, and Add Student Button in the same row */}
                <Row className="mt-2">
                  <Col className="search-container">
                    <Form.Control
                      placeholder="Search students by name or email"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Dropdown className="filter-icon">
                      <Dropdown.Toggle variant="success" id="dropdown-filter" style={{ backgroundColor: "transparent" }}>
                        <FaFilter style={{ fontSize: "30px" }} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-custom">
                        <Dropdown.Item onClick={() => setSelectedGrade(null)}>Clear Filter</Dropdown.Item>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                          <Dropdown.Item key={level} onClick={() => setSelectedGrade(level)}>
                            Level {level}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      variant="outline-success"
                      className="add-student-btn"
                      onClick={handleOpenAddStudent}
                    >
                      <i className="bi bi-person-plus me-2"></i> Add Student
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <Row>
                <Col xs={12} sm={12} md={isTablet ? 4 : 6}>
                  <h2 className="fw-bold" style={{ marginTop: "20px" }}>Student List</h2>
                </Col>
                <Col xs={12} sm={12} md={isTablet ? 8 : 6} className="d-flex align-items-center">
                  <InputGroup style={{ maxWidth: "430px", marginRight: '15px' }}>
                    <Form.Control
                      placeholder="Search students by name or email"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-filter" style={{ marginLeft: "20px", backgroundColor: "transparent" }}>
                        <FaFilter style={{ fontSize: "30px" }} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSelectedGrade(null)}>
                          Clear Filter
                        </Dropdown.Item>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                          <Dropdown.Item key={level} onClick={() => setSelectedGrade(level)}>
                            Level {level}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </InputGroup>
                  <Button variant="outline-success" onClick={handleOpenAddStudent}>
                    <i className="bi bi-person-plus me-2"></i> Add Student
                  </Button>
                </Col>
              </Row>
            )}
          </div>

          {/* Main Table */}
          <div className="sub-container mb-4" style={{ flex: 1, overflow: "auto" }}>
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
                    <th>Level</th>
                    <th>Status</th>
                    <th>Centre Name</th>
                    <th>Place</th>
                    <th>Joining Date</th>
                    <th>Current Level</th>
                    <th>Completed Level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents
                      .slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage)
                      .map((student, index) => (
                        <tr key={student.studentId || index}>
                          <td>{currentPage * studentsPerPage + index + 1}</td>
                          <td>{student.registerNumber}</td>
                          <td>{`${student.firstName} ${student.lastName}`}</td>
                          <td>{student.genderName}</td>
                          <td>{student.email}</td>
                          <td>{student.phoneNumber}</td>
                          <td>{new Date(student.dob).toLocaleDateString('en-GB')}</td>
                          <td>{student.gradeName}</td>
                          <td>
                            <Badge bg={student.statusName === 'Pending' ? 'warning' : 'success'}>
                              {student.statusName}
                            </Badge>
                          </td>
                          <td>{student.centreName}</td>
                          <td>{student.centrePlace}</td>
                          <td>{student.joiningDate ? new Date(student.joiningDate).toLocaleDateString('en-GB') : ''}</td>
                          <td>{student.currentLevel}</td>
                          <td>{student.completedLevel}</td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle size="sm" id={`dropdown-${student.studentId}`}>
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
                pageCount={totalPages}
                pageRangeDisplayed={10}
                marginPagesDisplayed={2}
                onPageChange={(e) => handlePageChange(e.selected + 1)}
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

export default StudentList;
