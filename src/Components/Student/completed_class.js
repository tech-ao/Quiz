import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import SidePannel from "./StudnetSidebar";
import StudentHeader from "./StudentHeader";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// import "./completed-class.css";

const completedClasses = [
  {
    id: 1,
    classTitle: "History of Ancient Civilizations",
    description: "An overview of ancient civilizations and their impact on modern society.",
    dateTime: "2025-02-10 10:00 AM",
    duration: 60,
    createdBy: "Mr. Brown",
    createdFor: "Grade 10",
  },
  {
    id: 2,
    classTitle: "Geography: The Earth’s Landscapes",
    description: "Understanding the different geographical landscapes and their formations.",
    dateTime: "2025-02-15 02:00 PM",
    duration: 45,
    createdBy: "Ms. White",
    createdFor: "Grade 9",
  },
  {
    id: 3,
    classTitle: "Introduction to Physics",
    description: "Fundamental concepts of physics and their real-world applications.",
    dateTime: "2025-02-18 11:30 AM",
    duration: 50,
    createdBy: "Dr. Adams",
    createdFor: "Grade 11",
  },
];

const Completed_class = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
   
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const datePickerRef = useRef(null);
  const filterIconRef = useRef(null);

 const toggleSidebar = () => {
       setIsSidebarVisible((prev) => !prev);
     };
   
 
 
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
      cls.classTitle.toLowerCase().includes(searchLower) ||
      cls.createdBy.toLowerCase().includes(searchLower);

    if (!selectedDate) return matchesSearch;

    const classDateOnly = cls.dateTime.split(" ")[0]; // Extracting just the date
    const selectedDateFormatted = selectedDate.toISOString().split("T")[0]; // Converting selected date to YYYY-MM-DD

    return matchesSearch && classDateOnly === selectedDateFormatted;
  });

  // Apply pagination after filtering
  const totalPages = Math.ceil(filteredClasses.length / rowsPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <StudentHeader toggleSidebar={toggleSidebar} />

<div className="d-flex">
  {isSidebarVisible && <SidePannel  />}
        <Container className="main-container p-4 min-vh-100 container-sub">
        <div className="sticky-header bg-white py-3 px-2 mb-3 d-flex  flex-md-row  align-items-start align-items-md-center ">
  <h2 className="fw-bold mb-0">Completed Classes</h2>

  <div className="d-flex align-items-center" style={{ position: "relative" }}>
    <Form.Control
      type="text"
      placeholder="Search subject..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-Bar"
    />
    <div
      ref={filterIconRef}
      className="Filtericon"
      style={{ position: "relative", marginLeft: "10px" }}
    >
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
            style={{
              cursor: "pointer",
              color: "green",
              fontWeight: "bold",
            }}
            onClick={clearFilters}
          >
            Clear
          </p>
        </div>
      )}
    </div>
  </div>
</div>


          {/* Table */}
          <Table responsive bordered className="mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Class Title</th>
                <th>Description</th>
                <th>Date Time</th>
                <th>Duration (min)</th>
                <th>Created By</th>
                <th>Created For</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClasses.length > 0 ? (
                paginatedClasses.map((cls, index) => (
                  <tr key={cls.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{cls.classTitle}</td>
                    <td>{cls.description}</td>
                    <td>{cls.dateTime}</td>
                    <td>{cls.duration}</td>
                    <td>{cls.createdBy}</td>
                    <td>{cls.createdFor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No classes found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
            </Pagination>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Completed_class;
