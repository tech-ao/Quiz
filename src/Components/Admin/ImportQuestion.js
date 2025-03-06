import React, { useState, useEffect } from "react";
import { FaFileUpload, FaDownload } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import "./ImportQuestion.css"; // Import the CSS for styling
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";

const ImportQuestion = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
   const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
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
  
    
    
  
  return (
    <div>
  <AdminHeader toggleSidebar={toggleSidebar} />
  <div className="d-flex">
    {isSidebarVisible && <Sidebar />}
    <Container className="main-container" >
      <div className="sub-container" >
      <main className="import-questions-container">
      <div class="sticky-head">
      <h2 className="title">
        Import Questions <span className="subtitle">upload using CSV file</span>
      </h2>
      </div>
      <div className="Content-box">
      <div className="upload-box">
        <label htmlFor="csvFile">CSV Questions file</label>
        <input type="file" id="csvFile" />
        <div className="button-group">
          <button className="upload-btn">  <FaFileUpload />Upload CSV file</button>
          <button className="download-btn"> <FaDownload /> Download Sample File</button>
        </div>
      </div>

      <Row className=" ms-2 align-items-center">
  {/* Level Select */}
  <Col xs={12} md={4}>
    <Form.Label className="fw-bold ">Select Level:</Form.Label>
    <Form.Select value="" className="w-60">
      {[...Array(6).keys()].map((i) => (
        <option key={i} value={`Level ${i + 1}`}>Level {i + 1}</option>
      ))}
    </Form.Select>
  </Col>

  {/* Title Input */}
  <Col xs={12} md={4}>
    <Form.Label className="fw-bold">Title:</Form.Label>
    <Form.Control
      type="number"
      placeholder="Enter the answer"
      value=""
      className="w-60"
    />
  </Col>

  {/* Description Textarea */}
  <Col xs={12} md={4}>
    <Form.Label className="fw-bold">Description:</Form.Label>
    <Form.Control
      as="textarea"
      rows={2}
      placeholder="Add a note"
      value=""
      className="w-60"
    />
  </Col>
</Row>

      <div className="instructions">
        <h3>How to convert CSV into Unicode (For Non-English)</h3>
        <ol>
          <li>Fill the data in an Excel sheet with the given format.</li>
          <li>
            Save the file as <strong>Unicode Text (*.txt)</strong>.
          </li>
          <li>Open the .txt file in Notepad.</li>
          <li>Replace Tab space with a comma ( , ).</li>
          <li>
            Save the file again with a .txt extension and change encoding to{" "}
            <strong>UTF-8</strong>.
          </li>
          <li>Change the file extension from .txt to .csv.</li>
          <li>Now, use this file to import questions.</li>
        </ol>
        <a href="#" className="more-info">For more info</a>
      </div>
      </div>
    </main>
    </div>
    </Container>
  </div>
</div>
  );
};

export default ImportQuestion;
