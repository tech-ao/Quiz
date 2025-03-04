import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TeacherHeader from "./TeacherHeader";
import TeacherSidePanel from "./TeacherSidepannel";
import { Container } from "react-bootstrap";
// import "./TeacherAssignment.css";

const TeacherAssignment = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  const [assignments] = useState([
    {
      id: 1,
      title: "Math Homework",
      description: "Solve 10 algebra problems",
      dueDate: "02/28/2025",
      assignedBy: "John Smith (Admin)",
      assignedTo: "Class 5 (A, B)",
    },
    {
      id: 2,
      title: "Science Project",
      description: "Prepare a model on Solar System",
      dueDate: "03/05/2025",
      assignedBy: "Emily Johnson (Admin)",
      assignedTo: "Class 6 (A, B, C)",
    },
    {
      id: 3,
      title: "English Essay",
      description: "Write an essay on 'Importance of Education'",
      dueDate: "03/10/2025",
      assignedBy: "David Brown (Admin)",
      assignedTo: "Class 7 (A, B)",
    },
  ]);

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

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 mx-auto">
          <div className="sub-container">
            <div
              className="d-flex justify-content-between align-items-center header-section"
              style={{
                marginTop: "20px",
                position: "sticky",
                top: "0",
                backgroundColor: "white",
                padding: "10px",
                flexWrap: "wrap",
              }}
            >
              <h4
                className="assignment-heading"
                style={{ marginBottom: "0", textAlign: "left", flex: 1 }}
              >
                <b>Assignment</b>
              </h4>
            </div>
            
            <div className="input-group" style={{ width: "140px", marginLeft:"84%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>

            <div
              className="table-responsive"
              style={{ maxHeight: "400px", overflowY: "auto", width:"95%" }}
            >
              <table className="table table-bordered table-hover table-custom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Assignment Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Assigned By</th>
                    <th>Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment, index) => (
                    <tr key={assignment.id}>
                      <td style={{textAlign:"center"}}>{index + 1}</td>
                      <td>{assignment.title}</td>
                      <td>{assignment.description}</td>
                      <td>{assignment.dueDate}</td>
                      <td>{assignment.assignedBy}</td>
                      <td>{assignment.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherAssignment;
