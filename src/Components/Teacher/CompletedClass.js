import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Form } from "react-bootstrap";
import TeacherHeader from "./TeacherHeader";
import TeacherSidePanel from "./TeacherSidepannel";
import "./CompletedClass.css";

const CompletedClass = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [searchTerm, setSearchTerm] = useState("");
  
  const completedClasses = [
    { id: 1, subject: "History", teacher: "Mr. Brown", date: "Feb 10, 2025" },
    { id: 2, subject: "Geography", teacher: "Ms. White", date: "Feb 15, 2025" },
    { id: 3, subject: "Physics", teacher: "Dr. Adams", date: "Feb 18, 2025" },
  ];

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

  const filteredClasses = completedClasses.filter((cls) => {
    const searchLower = searchTerm.toLowerCase();
    return cls.subject.toLowerCase().includes(searchLower) ||
           cls.teacher.toLowerCase().includes(searchLower);
  });

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100 main-box">
          <h2 className="fw-bold text-start mb-4" style={{marginTop:'24px'}}>Completed Classes</h2>
          
          {/* Search Section */}
          <div className="d-flex justify-content-end mb-4" style={{width:"40%", marginLeft:"650px"}}>
            <Form.Control
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              style={{marginLeft:"90px"}}
            />
          </div>

          {/* Table View */}
          <div className="mb-4" style={{width:"94%"}}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((cls) => (
                  <tr key={cls.id}>
                    <td>{cls.subject}</td>
                    <td>{cls.teacher}</td>
                    <td>{cls.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CompletedClass;