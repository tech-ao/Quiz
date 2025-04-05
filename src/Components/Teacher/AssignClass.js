import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TeacherHeader from "./TeacherHeader";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherAddPopup from "./TeacherAddpopup";
import "./AssignClass.css";

const BASE_URL = 'http://srimathicare.in:8081/api';
const API_KEY = '3ec1b120-a9aa-4f52-9f51-eb4671ee1280';

const getUserData = () => {
  const storedData = localStorage.getItem('teacherData');
  return storedData ? JSON.parse(storedData) : {};
};

const AssignClass = () => {
  const userData = getUserData();
  console.log("*******", userData);

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
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const fetchClassesByTeacherId = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://srimathicare.in:8081/api/Classess/GetClassesListByTeacherId?TeacherId=1`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-Api-Key': API_KEY
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const responseData = await response.json();
      console.log("API Response:", responseData);
      
      if (responseData.isSuccess && responseData.statusCode === 200) {
        // Use the data array from the response
        const classesData = Array.isArray(responseData.data) ? responseData.data : [];
        console.log("Classes data:", classesData);
        setAllClasses(classesData);
        setFilteredClasses(classesData);
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
    fetchClassesByTeacherId();
  }, []);

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
        (classItem.instructor && classItem.instructor.toLowerCase().includes(lowercasedSearch)) ||
        (classItem.createdBy && classItem.createdBy.toLowerCase().includes(lowercasedSearch))
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

  // Format date and time for display
  const formatDateTime = (date, time) => {
    if (!date) return "N/A";
    try {
      return `${date} ${time || ""}`.trim();
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
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
                <button
                  className="btn btn-success addbtn"
                  onClick={() => setShowPopup(true)}
                >
                  <i className="bi bi-plus"></i> Add Classes
                </button>
              </div>
              {showPopup && (
                <TeacherAddPopup
                  onClose={() => setShowPopup(false)}
                  onSave={(data) => {
                    console.log(data);
                    fetchClassesByTeacherId(); 
                  }}
                />
              )}

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
                maxHeight: "calc(100vh - 200px)", 
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
                      <th>Date Time</th>
                      <th>Instructor</th>
                      <th>Created By</th>
                      <th>Meeting Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(filteredClasses) && filteredClasses.length > 0 ? (
                      filteredClasses.map((classItem, index) => (
                        <tr key={classItem.id || index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{classItem.name || "N/A"}</td>
                          <td>{classItem.description || "N/A"}</td>
                          <td>{formatDateTime(classItem.date, classItem.time)}</td>
                          <td>{classItem.instructor || "N/A"}</td>
                          <td>{classItem.createdBy || "N/A"}</td>
                          <td>
                            {classItem.meetingLink ? (
                              <a href={classItem.meetingLink} target="_blank" rel="noopener noreferrer">
                                Join Meeting
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
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
                              >
                                <i className="bi bi-eye" style={{ fontSize: "20px" }}></i>
                              </button>

                              <button
                                className="btn btn-sm"
                                style={{ color: "#198754", background: "transparent" }}
                                onClick={() => handleAction("edit", classItem)}
                              >
                                <i className="bi bi-pencil" style={{ fontSize: "20px" }}></i>
                              </button>

                              <button
                                className="btn btn-sm"
                                style={{ color: "#198754", background: "transparent" }}
                                onClick={() => handleAction("remove", classItem)}
                              >
                                <i className="bi bi-trash" style={{ fontSize: "20px" }}></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-3">
                          No classes found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                      <strong>Created By:</strong> {selectedRow.createdBy || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Meeting Link:</strong> {selectedRow.meetingLink ? (
                        <a href={selectedRow.meetingLink} target="_blank" rel="noopener noreferrer">
                          {selectedRow.meetingLink}
                        </a>
                      ) : "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Created From:</strong> {selectedRow.createdFrom || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
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
                <button type="button" className="btn btn-primary">
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