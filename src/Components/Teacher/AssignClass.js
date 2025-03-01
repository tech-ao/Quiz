import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TeacherHeader from "./TeacherHeader";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherAddPopup from "./TeacherAddpopup";
import "./AssignClass.css";

const AssignClass = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [classes] = useState([
    {
      id: 1,
      title: "Online Course Class",
      description: "Live session for online students",
      dateTime: "02/28/2025 16:30:00",
      duration: 45,
      createdBy: "Joe Black (Super Admin : 9000)",
      createdFor: "Jason Sharlton (Teacher : 90006)",
      classes: ["Class 4 (A)", "Class 4 (B)", "Class 4 (C)", "Class 4 (D)"],
      status: "Awaited",
    },
    {
      id: 2,
      title: "Maths Interactive Session",
      description: "Doubt clearing session",
      dateTime: "03/01/2025 10:00:00",
      duration: 60,
      createdBy: "Sarah Williams (Admin : 9010)",
      createdFor: "Michael Brown (Teacher : 90015)",
      classes: ["Class 5 (A)", "Class 5 (B)"],
      status: "In Progress",
    },
    {
      id: 3,
      title: "Science Lab Virtual Tour",
      description: "Virtual experiments and learning",
      dateTime: "03/02/2025 14:30:00",
      duration: 90,
      createdBy: "Emma Davis (Admin : 9020)",
      createdFor: "Sophia Wilson (Teacher : 90020)",
      classes: ["Class 6 (A)", "Class 6 (B)", "Class 6 (C)"],
      status: "Completed",
    },
    {
      id: 4,
      title: "English Grammar Workshop",
      description: "Advanced writing techniques",
      dateTime: "03/03/2025 12:00:00",
      duration: 75,
      createdBy: "David Miller (Admin : 9030)",
      createdFor: "Olivia Johnson (Teacher : 90025)",
      classes: ["Class 7 (A)", "Class 7 (B)"],
      status: "Awaited",
    },
  ]);

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
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
  
  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <div className="assign-class main-container">
          <div className="sub-container assign-container">
            {/* Header Section */}
            <div
              className="d-flex justify-content-between align-items-center header-section"
              style={{
                marginTop: "20px",
                position: "sticky",
                top: "0",
                backgroundColor: "white",
                padding: "10px",
                zIndex: "1",
              }}
            >
              <h4 className="live-classes-heading">
                <b>Live Classes</b>
              </h4>
            </div>

            {/* Search and Tools Section */}
            <div className="d-flex flex-column align-items-end" style={{width:'98%'}}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <input
                  type="text"
                  className="form-control search-box"
                  style={{ width: "20%" }}
                  placeholder="Search..."
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
                  onSave={(data) => console.log(data)}
                />
              )}

              {/* Tools Buttons Below Add Button */}
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

            {/* Table Container with Horizontal and Vertical Scrolling */}
            <div 
              style={{
                overflow: "auto",
                maxHeight: "calc(100vh - 200px)", // Adjust based on your header/search section height
                marginTop: "15px",
                border: "1px solid #dee2e6",
                borderRadius: "4px"
              }}
            >
              <table className="table table-bordered table-hover table-custom m-0">
                <thead style={{ position: "sticky", top: "0", backgroundColor: "white", zIndex: "1" }}>
                  <tr>
                    <th style={{ width: "50px" }}>#</th>
                    <th>Class Title</th>
                    <th>Description</th>
                    <th>Date Time</th>
                    <th>Duration (mins)</th>
                    <th>Created By</th>
                    <th>Created For</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classItem, index) => (
                    <tr key={classItem.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{classItem.title}</td>
                      <td>{classItem.description}</td>
                      <td>{classItem.dateTime}</td>
                      <td>{classItem.duration}</td>
                      <td>{classItem.createdBy}</td>
                      <td>{classItem.createdFor}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          defaultValue={classItem.status}
                        >
                          <option value="Awaited">Awaited</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals remain unchanged */}
      {showDetails && (
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
                {selectedRow && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Title:</strong> {selectedRow.title}
                      </div>
                      <div className="mb-3">
                        <strong>Description:</strong> {selectedRow.description}
                      </div>
                      <div className="mb-3">
                        <strong>Date Time:</strong> {selectedRow.dateTime}
                      </div>
                      <div className="mb-3">
                        <strong>Duration:</strong> {selectedRow.duration}{" "}
                        minutes
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Created By:</strong> {selectedRow.createdBy}
                      </div>
                      <div className="mb-3">
                        <strong>Created For:</strong> {selectedRow.createdFor}
                      </div>
                      <div className="mb-3">
                        <strong>Status:</strong> {selectedRow.status}
                      </div>
                      <div className="mb-3">
                        <strong>Classes:</strong>
                        <ul className="list-unstyled">
                          {selectedRow.classes.map((cls) => (
                            <li key={cls}>{cls}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
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

      {showEdit && (
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
                {selectedRow && (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedRow.title}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        defaultValue={selectedRow.description}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        defaultValue={selectedRow.dateTime}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Duration (minutes)</label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={selectedRow.duration}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option value="Awaited">Awaited</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </form>
                )}
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger">
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