import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentHeader from "./StudentHeader";
import StudentSidePannel from "./StudnetSidebar";
import TeacherAddPopup from "../Teacher/TeacherAddpopup";
import "../Teacher/AssignClass.css";

const BASE_URL = 'http://srimathicare.in:8081/api';
const API_KEY = '3ec1b120-a9aa-4f52-9f51-eb4671ee1280';

const getUserData = () => {
  const storedData = localStorage.getItem('studentId');
  return storedData ? JSON.parse(storedData) : {};
};

const AssignClass = () => {
  const userData = getUserData();
  const studentId = userData.userId;
  console.log(localStorage.getItem('studentId'));

  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [allClasses, setAllClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const fetchClasses = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListClasses`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        },
        body: JSON.stringify({
            studentId: localStorage.getItem('studentId'), 
            paginationDetail: {
              pageSize: pageSize,
              pageNumber: page
            }
          })
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (responseData.isSuccess && responseData.statusCode === 200) {
        const classesData = responseData.data.searchAndListClassesResult || [];
        const formattedData = classesData.map(cls => {
          let dateTime = cls.classDate ? new Date(cls.classDate) : null;
          let formattedDate = dateTime ? dateTime.toLocaleDateString() : null;

          return {
            id: cls.classId,
            name: cls.className,
            description: cls.description || "N/A",
            date: formattedDate,
            time: cls.classTime,
            instructor: cls.instructor,
            meetingLink: cls.meetingLink,
            objectId: cls.objectId
          };
        });

        console.log("Formatted Classes data:", formattedData);
        setAllClasses(formattedData);
        setFilteredClasses(formattedData);
        setTotalCount(responseData.data.totalCount || 0);
        setCurrentPage(page);
      } else {
        throw new Error(responseData.message || 'Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses(currentPage);
  }, [currentPage, studentId]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredClasses(allClasses);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = allClasses.filter(
      (classItem) =>
        (classItem.name && classItem.name.toLowerCase().includes(lowercasedSearch)) ||
        (classItem.description && classItem.description.toLowerCase().includes(lowercasedSearch)) ||
        (classItem.instructor && classItem.instructor.toLowerCase().includes(lowercasedSearch))
    );

    setFilteredClasses(filtered);
  }, [searchTerm, allClasses]);

  const handleAction = (action, rowData) => {
    setSelectedRow(rowData);
    switch (action) {
      case "view":
        setShowDetails(true);
        break;
      case "edit":
        setShowEdit(true);
        break;
      case "remove":
        setShowDeleteConfirm(true);
        break;
      default:
        break;
    }
  };

  const handleJoinMeeting = (meetingLink) => {
    if (meetingLink && meetingLink.trim() !== "") {
      let formattedUrl = meetingLink;
      if (!meetingLink.startsWith('http://') && !meetingLink.startsWith('https://')) {
        formattedUrl = 'https://' + meetingLink;
      }
      window.open(formattedUrl, '_blank');
    } else {
      alert("No meeting link available for this class.");
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchClasses(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pageButtons = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    pageButtons.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
      </li>
    );
    
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    
    pageButtons.push(
      <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </li>
    );
    
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {pageButtons}
        </ul>
      </nav>
    );
  };

  return (
    <div>
      <StudentHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <StudentSidePannel />}
        <div className="assign-class main-container">
          <div className="sub-container assign-container">
            <div className="d-flex justify-content-between align-items-center header-section" style={{ marginTop: "20px", position: "sticky", top: "0", backgroundColor: "white", padding: "10px", zIndex: "1" }}>
              <h4 className="live-classes-heading"><b>Live Classes</b></h4>
            </div>

            <div className="d-flex flex-column align-items-end" style={{ width: '98%' }}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <input
                  type="text"
                  className="form-control search-box"
                  style={{ width: "20%" }}
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="tools-buttons mt-2 d-flex gap-2">
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-file-text"></i>
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-download"></i>
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-printer"></i>
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-grid"></i>
                </button>
              </div>
            </div>

            <div 
              style={{
                overflow: "auto",
                maxHeight: "calc(100vh - 250px)", 
                marginTop: "15px",
                border: "1px solid #dee2e6",
                borderRadius: "4px"
              }}
            >
              {loading ? (
                <div className="text-center py-3">Loading classes...</div>
              ) : error ? (
                <div className="text-center py-3 text-danger">{error}</div>
              ) : (
                <table className="table table-bordered table-hover table-custom m-0">
                  <thead style={{ position: "sticky", top: "0", backgroundColor: "white", zIndex: "1" }}>
                    <tr>
                      <th style={{ width: "50px" }}>#</th>
                      <th>Class Name</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Instructor</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(filteredClasses) && filteredClasses.length > 0 ? (
                      filteredClasses.map((classItem, index) => (
                        <tr key={classItem.id || index}>
                          <td className="text-center">{(currentPage - 1) * pageSize + index + 1}</td>
                          <td>{classItem.name || "N/A"}</td>
                          <td>{classItem.description || "N/A"}</td>
                          <td>{classItem.date || "N/A"}</td>
                          <td>{classItem.time || "N/A"}</td>
                          <td>{classItem.instructor || "N/A"}</td>
                          <td className="action-column">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                flexWrap: "nowrap",
                              }}
                            >
                              <button
                                className="btn btn-sm"
                                style={{ color: "#198754", background: "transparent" }}
                                onClick={() => handleAction("view", classItem)}
                                title="View Details"
                              >
                                <i className="bi bi-eye" style={{ fontSize: "18px" }}></i>
                              </button>

                              <button
                                className="btn btn-sm"
                                style={{ color: "#198754", background: "transparent" }}
                                onClick={() => handleAction("edit", classItem)}
                                title="Edit Class"
                              >
                                <i className="bi bi-pencil" style={{ fontSize: "18px" }}></i>
                              </button>

                              <button
                                className="btn btn-sm"
                                style={{ color: "#198754", background: "transparent" }}
                                onClick={() => handleAction("remove", classItem)}
                                title="Delete Class"
                              >
                                <i className="bi bi-trash" style={{ fontSize: "18px" }}></i>
                              </button>
                              
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleJoinMeeting(classItem.meetingLink)}
                                disabled={!classItem.meetingLink}
                                title={classItem.meetingLink ? "Join Meeting" : "No Meeting Link Available"}
                              >
                                <i className="bi bi-camera-video-fill me-1"></i>
                                Join
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-3">
                          No classes found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            
            {/* Pagination */}
            <div className="mt-3">
              {renderPagination()}
              {totalCount > 0 && (
                <div className="text-center mt-2">
                  <small className="text-muted">
                    Showing {filteredClasses.length} of {totalCount} total classes
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showDetails && selectedRow && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Class Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetails(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Name:</strong> {selectedRow.name || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Description:</strong> {selectedRow.description || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Date:</strong> {selectedRow.date || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Time:</strong> {selectedRow.time || "N/A"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Instructor:</strong> {selectedRow.instructor || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Meeting Link:</strong> {selectedRow.meetingLink ? (
                        <a href={selectedRow.meetingLink} target="_blank" rel="noopener noreferrer">
                          {selectedRow.meetingLink}
                        </a>
                      ) : "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Class ID:</strong> {selectedRow.id || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Object ID:</strong> {selectedRow.objectId || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {selectedRow.meetingLink && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleJoinMeeting(selectedRow.meetingLink)}
                  >
                    <i className="bi bi-camera-video-fill me-1"></i> Join Meeting
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEdit && selectedRow && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Class</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEdit(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedRow.name || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      defaultValue={selectedRow.description || ""}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        defaultValue={selectedRow.date || ""}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Time</label>
                      <input
                        type="time"
                        className="form-control"
                        defaultValue={selectedRow.time || ""}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Instructor</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedRow.instructor || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Meeting Link</label>
                    <input
                      type="url"
                      className="form-control"
                      defaultValue={selectedRow.meetingLink || ""}
                      placeholder="e.g. https://zoom.us/j/123456789"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    console.log("Save changes clicked");
                    setShowEdit(false);
                    fetchClasses(currentPage);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this class?</p>
                {selectedRow && <p><strong>{selectedRow.name || "Unnamed class"}</strong></p>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => {
                    console.log("Deleting class:", selectedRow);
                    setShowDeleteConfirm(false);
                    fetchClasses(currentPage);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignClass;