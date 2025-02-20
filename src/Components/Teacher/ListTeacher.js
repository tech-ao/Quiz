import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Sidebar from '../Admin/SidePannel';
import AdminHeader from '../Admin/AdminHeader';
import { Container, Row, Col, Button, Table, Form, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import EditTeacher from './EditTeacher';
import AddTeacher from './AddTeacher';
import ViewTeacher from '../ViewTeacher';
import { useNavigate } from "react-router-dom";

const ListTeacher = ({ Teachers = [] }) => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showEditTeacher, setShowEditTeacher] = useState(false);
  const [showViewTeacher, setShowViewTeacher] = useState(false);
   const [showAddTeacher, setShowAddTeacher] = useState(false);
  const TeachersPerPage = 10;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset pagination on search
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOpenEditTeacher = () => setShowEditTeacher(true);
  const handleCloseEditTeacher = () => setShowEditTeacher(false);
  const handleOpenViewTeacher = () => setShowViewTeacher(true);
  const handleCloseViewTeacher = () => setShowViewTeacher(false);
  const handleOpenAddTeacher = () => setShowAddTeacher(true);
  const handleCloseAddTeacher = () => setShowAddTeacher(false);
  const TeacherData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    countryCode: "+91",
    dob: "2000-01-01",
    grade: "Grade 3",
    address: "123 Street, City",
  };

  const filteredTeachers = Teachers.filter((Teacher) =>
    [Teacher.username, Teacher.email]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const currentTeachers = filteredTeachers.slice(
    currentPage * TeachersPerPage,
    (currentPage + 1) * TeachersPerPage
  );

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4">
          <div className="sub-container">
            <Row className="align-items-center mb-4">
              <Col md={6}>
                <h2 className="fw-bold">Teacher List</h2>
              </Col>
              <Col md={6} className="d-flex  align-items-center" style={{ marginTop: window.innerWidth<=768?"10px":"30px"}}>
                <InputGroup style={{ maxWidth: window.innerWidth <= 768 ? "50%" : "400px", marginRight: '15px' }}>
                  <Form.Control
                    placeholder="Search Teachers by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                   
                  />
                </InputGroup>
                <Button variant="outline-success"onClick={handleOpenAddTeacher}>
                  <i className="bi bi-person-plus me-2"></i> Add Teacher
                </Button>
              </Col>
            </Row>

            <div className="table-responsive">
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
                    currentTeachers.map((Teacher, index) => (
                      <tr key={Teacher.id}>
                        <td>{index + 1}</td>
                        <td>{Teacher.username}</td>
                        <td>{Teacher.email}</td>
                        <td>{Teacher.dob || 'N/A'}</td>
                        <td>{Teacher.phone}</td>
                        <td>
                          <div className="d-flex">
                            <div className="icon-button-container">
                              <Button variant="outlined" size="sm" className="icon-button" onClick={handleOpenEditTeacher}>
                                <FaEdit className="icon" />
                              </Button>
                              <span className="tooltip-text">Edit</span>
                            </div>
                            <div className="icon-button-container">
                              <Button variant="outlined" size="sm" className="icon-button">
                                <FaTrash className="icon" />
                              </Button>
                              <span className="tooltip-text">Delete</span>
                            </div>
                            <div className="icon-button-container">
                              <Button variant="outlined" size="sm" className="icon-button" onClick={handleOpenViewTeacher}>
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
                      <td colSpan="5" className="text-center">
                        No Teachers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-center ">
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
        <EditTeacher show={showEditTeacher} onClose={handleCloseEditTeacher} />
        <ViewTeacher show={showViewTeacher} onClose={() => setShowViewTeacher(false)} TeacherData={TeacherData} />
      </div>
    </div>
  );
};

export default ListTeacher;