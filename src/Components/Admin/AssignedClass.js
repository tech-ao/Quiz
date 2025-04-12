import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AssignedClass.css"; // Adjust based on actual filename
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import AdminOnlineClassPopup from "./AdminOnlineClassPopup";
import { Container } from "react-bootstrap";

const AssignedClass = () => {
  // State management
  const [selectedRow, setSelectedRow] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [showPopup, setShowPopup] = useState(false);
  
  // Sample data
  const [allClasses, setAllClasses] = useState([
    {
      id: 5,
      title: "General Knowledge Quiz",
      description: "A fun and engaging quiz covering various subjects",
      dateTime: "03/04/2025 10:00:00",
      duration: 45,
      createdBy: "James Anderson (Admin : 9040)",
      createdFor: "William Carter (Teacher : 90030)",
      classes: ["Class 6 (A)", "Class 6 (B)", "Class 6 (C)"],
      status: "Awaited",
    },
    {
      id: 6,
      title: "Algebra Problem-Solving",
      description: "Solving algebraic equations and real-world problems",
      dateTime: "03/05/2025 12:30:00",
      duration: 60,
      createdBy: "Sophia Martinez (Super Admin : 9050)",
      createdFor: "Benjamin Lee (Teacher : 90035)",
      classes: ["Class 7 (A)", "Class 7 (B)"],
      status: "In Progress",
    },
    {
      id: 7,
      title: "Computer Programming Basics",
      description: "Introduction to programming concepts and logic",
      dateTime: "03/06/2025 15:00:00",
      duration: 90,
      createdBy: "Ella Robinson (Admin : 9060)",
      createdFor: "Daniel Harris (Teacher : 90040)",
      classes: ["Class 8 (A)", "Class 8 (B)", "Class 8 (C)"],
      status: "Completed",
    },
    {
      id: 8,
      title: "Logical Reasoning Quiz",
      description: "Testing students' logical thinking and problem-solving skills",
      dateTime: "03/07/2025 17:00:00",
      duration: 50,
      createdBy: "Mason White (Admin : 9070)",
      createdFor: "Isabella Thomas (Teacher : 90045)",
      classes: ["Class 9 (A)", "Class 9 (B)"],
      status: "Awaited",
    },
  ]);
  
   
   // Filtered classes based on search term
   const [filteredClasses, setFilteredClasses] = useState(allClasses);
 
  // Responsive sidebar handling
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
      setIsSmallScreen(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



   // Handle search functionality
    useEffect(() => {
      if (searchTerm.trim() === "") {
        setFilteredClasses(allClasses);
        return;
      }
      
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = allClasses.filter(
        (classItem) =>
          classItem.title.toLowerCase().includes(lowercasedSearch) ||
          classItem.description.toLowerCase().includes(lowercasedSearch) ||
          classItem.createdBy.toLowerCase().includes(lowercasedSearch) ||
          classItem.createdFor.toLowerCase().includes(lowercasedSearch) ||
          classItem.status.toLowerCase().includes(lowercasedSearch) ||
          classItem.classes.some(cls => cls.toLowerCase().includes(lowercasedSearch))
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
            setEditFormData({...rowData});
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
    <div className="assigned-class-container">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex main-content-wrapper">
        {isSidebarVisible && <Sidebar />}
        <div className=" main-container">

        <div
              className="sticky-header d-flex justify-content-between align-items-center header-section"
            
            >
              <h4 className="live-classes-heading">
                <b>Live Classes</b>
              </h4>
            </div>
          <div className="sub-container">
            {/* Header Section */}
           

            {/* Search and Tools Section */}
            <div className="d-flex flex-column align-items-end" style={{width:'98%'}}>
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
                              <AdminOnlineClassPopup
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
                  {filteredClasses.map((classItem, index) => (
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
                  
                  {filteredClasses.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-3">
                        No classes found matching your search criteria.
                      </td>
                    </tr>
                  )}
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
          {editFormData && (
            <form>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={editFormData.dateTime}
                  onChange={(e) => setEditFormData({...editFormData, dateTime: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  value={editFormData.duration}
                  onChange={(e) => setEditFormData({...editFormData, duration: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select 
                  className="form-select" 
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                >
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
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {
              const updatedClasses = allClasses.map(c => 
                c.id === editFormData.id ? editFormData : c
              );
              setAllClasses(updatedClasses);
              setShowEdit(false);
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
    const updatedClasses = allClasses.filter(c => c.id !== selectedRow.id);
    setAllClasses(updatedClasses);
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

export default AssignedClass;