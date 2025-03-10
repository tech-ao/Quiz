import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./CompletedClass.css";

const completedClasses = [
  { id: 1, subject: "History", teacher: "Mr. Brown", date: "2025-02-10" },
  { id: 2, subject: "Geography", teacher: "Ms. White", date: "2025-02-15" },
  { id: 3, subject: "Physics", teacher: "Dr. Adams", date: "2025-02-18" },
];

const CompletedClass = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const filterIconRef = useRef(null);

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
 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        filterIconRef.current &&
        !filterIconRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDate(null);
  };

  const filteredClasses = completedClasses.filter((cls) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      cls.subject.toLowerCase().includes(searchLower) ||
      cls.teacher.toLowerCase().includes(searchLower);
  
    if (!selectedDate) return matchesSearch;
  
    const selectedDateFormatted = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD format
    return matchesSearch && cls.date === selectedDateFormatted;
  });
  

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100 container-sub">
          <Row className="sub-container align-items-center mb-4">
            <Col md={6} style={{ marginTop: "20px" }}>
              <h2 className="fw-bold">Completed Classes</h2>
            </Col>
          </Row>
          <div className="d-flex justify-content-end align-items-center mb-3" style={{ position: "relative" }}>
            <Form.Control
              type="text"
              placeholder="Search subject...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-Bar"
            />
            <div ref={filterIconRef} className="Filtericon" style={{ position: "relative", marginLeft: "10px" }}>
              <FaCalendarAlt
                size={24}
                style={{ cursor: "pointer", color: "green" }}
                onClick={() => setShowDatePicker(!showDatePicker)}
              />
              {showDatePicker && (
  <div
    ref={datePickerRef}
    className="datepick"
    style={{
      position: "absolute",
      top: "100%",
      right: "0",
      zIndex: 1000,
      background: "white",
      padding: "6px",
      borderRadius: "5px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        setShowDatePicker(false);
      }}
      inline
    />
    <p 
      className="text-center mt-2" 
      style={{ cursor: "pointer", color: "green", fontWeight: "bold" }} 
      onClick={clearFilters}
    >
      Clear
    </p>
  </div>
)}

            </div>
          </div>
          <Table responsive bordered style={{ width: "98%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls, index) => (
                  <tr key={cls.id}>
                    <td>{index + 1}</td>
                    <td>{cls.subject}</td>
                    <td>{cls.teacher}</td>
                    <td>{cls.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3">No classes found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default CompletedClass;
