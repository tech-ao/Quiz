import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import TeacherHeader from "./TeacherHeader";
import TeacherSidePanel from "./TeacherSidepannel";
import "./CompletedClass.css";
import { BsFilter } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CompletedClass = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const filterIconRef = useRef(null);
  const datePickerRef = useRef(null);

  const completedClasses = [
    { id: 1, subject: "History", teacher: "Mr. Brown", date: "2025-02-10" },
    { id: 2, subject: "Geography", teacher: "Ms. White", date: "2025-02-15" },
    { id: 3, subject: "Physics", teacher: "Dr. Adams", date: "2025-02-18" },
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const toggleDateFilter = () => {
    setShowDateFilter((prev) => !prev);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const clearDateFilter = () => {
    setSelectedDate("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
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
        setShowDateFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredClasses = completedClasses.filter((cls) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      cls.subject.toLowerCase().includes(searchLower) ||
      cls.teacher.toLowerCase().includes(searchLower);
    const matchesDate = selectedDate ? cls.date === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  const formatDisplayDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100 main-box">
          <h2 className="fw-bold text-start mb-4" style={{ marginTop: "24px" }}>
            Completed Classes
          </h2>
          {/* Search Section with Filter Icon */}
          <div className="searchBox position-relative">
            <Form.Control
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput searchBar"
            />
            {/* Filter Icon */}
            <div
  ref={filterIconRef}
  className="filter-icon-container"
  style={{
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer"
  }}
>
  <BsFilter size={24} color="#09690c" 
    onClick={() => setShowDateFilter(!showDateFilter)}  // Fixed here
  />
  {showDateFilter && (
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
        width: "fit-content"
      }}
    >
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setShowDateFilter(false);
        }}
        inline
      />
    </div>
  )}
</div>
          </div>
          {/* Active Filter Indicator */}
          {selectedDate && (
            <div className="mt-2 mb-3">
              <span
                className="badge rounded-pill"
                style={{
                  backgroundColor: "#E7FFEC",
                  color: "#09690c",
                  padding: "8px 12px",
                  fontSize: "0.9rem"
                }}
              >
                Date: {formatDisplayDate(selectedDate)}
                <span
                  className="ms-2"
                  onClick={clearDateFilter}
                  style={{ cursor: "pointer" }}
                >
                  ×
                </span>
              </span>
            </div>
          )}
          {/* Table View */}
          <div className="mb-4 table-container" style={{ width: "98%" }}>
            <Table responsive>
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
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{cls.subject}</td>
                      <td>{cls.teacher}</td>
                      <td>{formatDisplayDate(cls.date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      No classes found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CompletedClass;