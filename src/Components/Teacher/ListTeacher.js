import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Sidebar from '../Admin/SidePannel';
import AdminHeader from '../Admin/AdminHeader';
import { Container, Row, Col, Button, Table, Form, InputGroup, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers, deleteTeacherAction, fetchTeacher } from "../../redux/Action/TeacherAction";
import EditTeacher from './EditTeacher';
import AddTeacher from './AddTeacher';
import ViewTeacher from '../ViewTeacher';
import { toast } from 'react-toastify';

const ListTeacher = () => {
  const dispatch = useDispatch();

  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [teacherData, setTeacherData] = useState(null); // State to hold selected teacher data
  const [showEditTeacher, setShowEditTeacher] = useState(false);
  const [showViewTeacher, setShowViewTeacher] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const TeachersPerPage = 10;

  useEffect(() => {
    const fetchTeachers = () => {
      const paginationDetail = {
        pageSize: TeachersPerPage,
        pageNumber: currentPage + 1,
      };
      console.log("Fetching teachers with pagination detail:", paginationDetail);
      dispatch(getTeachers({ paginationDetail }));
    };

    fetchTeachers();
  }, [dispatch, currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const { Teachers: teachersData = {}, loading, error } = useSelector((state) => {
    console.log("Redux state for teachers:", state.teachers);
    return state.teachers;
  });

  // Access the searchAndListTeacherResult array from the teachersData
  const Teachers = teachersData.data ? teachersData.data.searchAndListTeacherResult : [];

  useEffect(() => {
    console.log("Teachers fetched from Redux:", Teachers);
  }, [Teachers]);

  const handleOpenEditTeacher = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setShowEditTeacher(true);
  };

  const handleCloseEditTeacher = () => {
    setShowEditTeacher(false);
    setSelectedTeacherId(null);
  };

  const handleOpenViewTeacher = (teacherId) => {
    setSelectedTeacherId(teacherId);
    dispatch(fetchTeacher(teacherId)) // Fetch the teacher details
      .then((response) => {
        setTeacherData(response.data); // Set the teacher data from the response
        setShowViewTeacher(true);
      })
      .catch((err) => {
        toast.error("Failed to fetch teacher details.");
      });
  };

  const handleCloseViewTeacher = () => {
    setShowViewTeacher(false);
    setTeacherData(null); // Clear the teacher data when closing
  };

  const handleOpenAddTeacher = () => setShowAddTeacher(true);
  const handleCloseAddTeacher = () => setShowAddTeacher(false);

  const handleOpenDeleteModal = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTeacherId(null);
  };

  const handleDeleteTeacher = () => {
    if (!selectedTeacherId) return;
    dispatch(deleteTeacherAction(selectedTeacherId))
      .then(() => {
        toast.success("Teacher deleted successfully!");
        dispatch(getTeachers({ paginationDetail: { pageSize: TeachersPerPage, pageNumber: currentPage + 1 } }));
        handleCloseDeleteModal();
      })
      .catch(() => {
        toast.error("Failed to delete the teacher.");
      });
  };

  const filteredTeachers = Array.isArray(Teachers) ? Teachers.filter((teacher) =>
    [teacher.fullName, teacher.email]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ) : [];

  const currentTeachers = filteredTeachers.slice(
    currentPage * TeachersPerPage,
    (currentPage + 1) * TeachersPerPage
  );

  return (
    <div>
      <AdminHeader toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            <Row className="align-items-center mt-2">
              <Col md={6}>
                <h2 className="fw-bold">Teacher List</h2>
              </Col>
              <Col md={6} className="d-flex" style={{ marginTop: isMobile ? "10px" : "30px" }}>
                <InputGroup style={{ maxWidth: isMobile ? "55%" : "400px", marginRight: '35px' }}>
                  <Form.Control
                    placeholder="Search Teachers by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </InputGroup>
                <Button variant="outline-success" onClick={handleOpenAddTeacher} style={{ maxWidth: isMobile ? "45%" : "200px" }}>
                  <i className="bi bi-person-plus me-2"></i> Add Teacher
                </Button>
              </Col>
            </Row>

            <div className="table-responsive" style={{ maxWidth: "1250px" }}>
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Teacher Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeachers.length > 0 ? (
                    currentTeachers.map((teacher, index) => (
                      <tr key={teacher.teacherId}>
                        <td>{index + 1}</td>
                        <td>{teacher.fullName}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.dob || 'N/A'}</td>
                        <td>{teacher.phoneNumber}</td>
                        <td>
                          <div className="d-flex">
                            <Button variant="outline-primary" size="sm" onClick={() => handleOpenEditTeacher(teacher.teacherId)}>
                              <FaEdit />
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleOpenDeleteModal(teacher.teacherId)}>
                              <FaTrash />
                            </Button>
                            <Button variant="outline-info" size="sm" onClick={() => handleOpenViewTeacher(teacher.teacherId)}>
                              <FaEye />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        {loading ? "Loading..." : "No Teachers found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-center">
              <ReactPaginate
                pageCount={Math.ceil(filteredTeachers.length / TeachersPerPage)}
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
          </div>
        </Container>

        <AddTeacher show={showAddTeacher} onClose={handleCloseAddTeacher} />
        <EditTeacher show={showEditTeacher} onClose={handleCloseEditTeacher} teacherId={selectedTeacherId} />
        <ViewTeacher show={showViewTeacher} onClose={handleCloseViewTeacher} teacherData={teacherData} />

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Teacher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this teacher?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteTeacher}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ListTeacher;