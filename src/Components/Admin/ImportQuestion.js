import React, { useState, useEffect, useRef } from "react";
import { FaFileUpload, FaDownload } from "react-icons/fa";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import "./ImportQuestion.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import * as XLSX from "xlsx";

const ImportQuestion = () => {
  const API_URL_IMPORT = "http://srimathicare.in:8081/api/ImportExcel/ImportQuestion";
  const API_URL_GET_QUESTIONS = "http://srimathicare.in:8081/api/SearchAndList/SearchAndListQuestions";

  const fileInputRef = useRef(null);
  const [level, setLevel] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchQuestions = async () => {
    try {
      const response = await fetch(API_URL_GET_QUESTIONS, {
        method: "POST",
        headers: {
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: level,
          pagination: {
            pageSize: 100,
            pageNumber: 1,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const result = await response.json();
      if (result.isSuccess) {
        setUploadedQuestions(result.data.questions || []);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const convertExcelToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!excelFile) {
      alert("Please select an Excel (.xlsx) file to upload.");
      return;
    }

    setIsLoading(true);
    setUploadStatus("Uploading...");

    try {
      const questionBase64 = await convertExcelToBase64(excelFile);

      const requestBody = {
        questionBase64: questionBase64,
        title: title,
        level: level, 
        description: description, 
      };

      const response = await fetch(API_URL_IMPORT, {
        method: "POST",
        headers: {
          accept: "text/plain",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result = await response.json();
      setUploadStatus("Questions uploaded successfully!");
      
      // Fetch and display the newly uploaded questions
      await fetchQuestions();
      
      setExcelFile(null);
      setTitle("");
      setDescription("");
      setLevel(1);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading questions:", error);
      setUploadStatus("Failed to upload questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSampleFile = () => {
    // Sample data that matches your actual question structure
    const sampleData = [
      ["Sno", "Questions", "Answer", "Level", "Title", "Description"],
      [
        "1", 
        "1,-2,2,3,2,5,6,-1", 
        "2", 
        "1", 
        "Sample Title 1", 
        "This is a sample description for question 1"
      ],
      [
        "2", 
        "1,2,3,4,5,6,7,8,9", 
        "9", 
        "1", 
        "Sample Title 2", 
        "This is a sample description for question 2"
      ],
      [
        "3", 
        "10,20,30,40,50", 
        "50", 
        "2", 
        "Sample Title 3", 
        "This is a sample description for question 3"
      ]
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SampleQuestions");
    
    // Format the header row
    if (!ws['!cols']) ws['!cols'] = [];
    ws['!cols'][0] = { width: 5 };  // Sno column width
    ws['!cols'][1] = { width: 20 }; // Questions column width
    ws['!cols'][2] = { width: 10 }; // Answer column width
    ws['!cols'][3] = { width: 8 };  // Level column width
    ws['!cols'][4] = { width: 15 }; // Title column width
    ws['!cols'][5] = { width: 25 }; // Description column width
  
    XLSX.writeFile(wb, "Question_Import.xlsx");
  };
  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            <main className="import-questions-container">
              <div className="sticky-head">
                <h2 className="title mb-3">
                  Import Questions{" "}
                  <span className="subtitle">Upload using Excel file</span>
                </h2>
              </div>

              <div className="Content-box">
                <div className="upload-box">
                  <label htmlFor="excelFile">Excel Questions file (.xlsx)</label>
                  <input
                    type="file"
                    id="excelFile"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    ref={fileInputRef} 
                  />

                  <div className="button-group">
                    <button 
                      className="upload-btn" 
                      onClick={handleUpload}
                      disabled={isLoading}
                    >
                      {isLoading ? "Uploading..." : "Upload Excel file"}
                    </button>
                    <button className="download-btn" onClick={downloadSampleFile}>
                      📥 Download Sample File
                    </button>
                  </div>
                </div>

                {uploadStatus && <p className={`status-message ${uploadStatus.includes("Failed") ? "error" : "success"}`}>{uploadStatus}</p>}
                
                <div className="new-field d-flex align-items-center">
                  <div className="form-group">
                    <label htmlFor="level">Select Level:</label>
                    <select
                      id="level"
                      value={level}
                      onChange={(e) => setLevel(Number(e.target.value))} 
                    >
                      <option value={1}>Level 1</option>
                      <option value={2}>Level 2</option>
                      <option value={3}>Level 3</option>
                      <option value={4}>Level 4</option>
                      <option value={5}>Level 5</option>
                      <option value={6}>Level 6</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      placeholder="Enter title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      placeholder="Add description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Display Uploaded Questions Table */}
                {uploadedQuestions.length > 0 && (
                  <div className="uploaded-questions-table">
                    <h6>Uploaded Questions (Level {level})</h6>
                    <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                      <Table responsive="md">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uploadedQuestions.map((question, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{question.questions}</td>
                              <td>{question.answer}</td>
                              <td>{question.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}

                <div className="instructions">
                  <h3>How to convert CSV into Unicode (For Non-English)</h3>
                  <ol>
                    <li>Fill the data in an Excel sheet with the given format.</li>
                    <li>Save the file as <strong>Unicode Text (*.txt)</strong>.</li>
                    <li>Open the .txt file in Notepad.</li>
                    <li>Replace Tab space with a comma ( , ).</li>
                    <li>Save the file again with a .txt extension and change encoding to <strong>UTF-8</strong>.</li>
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