import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SidePannel from "./StudnetSidebar";
import StudentHeader from "./StudentHeader";
// import "./Assigned_class.css";

const Assigned_class = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [allClasses] = useState([
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
  
  // Filtered classes based on search term
  const [filteredClasses, setFilteredClasses] = useState(allClasses);

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 1024
  );


    const toggleSidebar = () => {
      setIsSidebarVisible((prev) => !prev);
    };
  

 const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
   const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
 
   useEffect(() => {
     const handleResize = () => {
       // Sidebar visible only for screens 1024px and above
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
  

  
  return (
    <div>
    <StudentHeader toggleSidebar={toggleSidebar} />

    <div className="d-flex">
      {isSidebarVisible && <SidePannel  />}
      <Container className="main-container">
  {/* Sticky Header with Title and Search */}
  <div
    className="d-flex justify-content-between align-items-center flex-wrap"
    style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "#fff",
      padding: "10px 15px",
    }}
  >
    <h4 className="live-classes-heading mb-2 mb-md-0"><b>Live Classes</b></h4>
    <input
      type="text"
      className="form-control search-box"
      style={{ width: isSmallScreen ? "100%" : "250px", maxWidth: "100%" }}
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="sub-container assign-container">
    {/* Table Section remains the same */}


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
                    <th>Join Class</th>
                   
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
                      <button
    className="btn btn-success btn-sm "
    // onClick={() => setShowPopup(true)}
    style={{
      minWidth: '20px',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      transition: 'all 0.2s ease'
    }}
  >
    <i className="bi bi-plus-lg"></i>
  </button>
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
        </Container>
      </div>
      
      

    
    </div>
  );
};

export default Assigned_class; 