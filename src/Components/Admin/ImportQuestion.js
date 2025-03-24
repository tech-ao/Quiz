import React, { useState, useEffect,useRef } from "react";
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
import * as XLSX from "xlsx";


const ImportQuestion = () => {
  const API_URL_IMPORT = "http://your-api-url.com/upload"; // Replace with your actual API endpoint

  const fileInputRef = useRef(null);
  const [level, setLevel] = useState(1); // Default value can be 1 or empty
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

  const [excelFile, setExcelFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
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

    try {
      const questionBase64 = await convertExcelToBase64(excelFile);
      console.log("Base64 Content:", questionBase64.slice(0, 100) + "...");

      const requestBody = {
        questionBase64: questionBase64,
        title: "Your Title Here", 
        level: 1, 
        description: "Your Description Here", 
      };

      console.log("Request Body:", requestBody);

      console.log("Request Body:", requestBody);

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
      console.log("Upload result:", result);
      setExcelFile(null);

      // ✅ Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading questions:", error);
      setUploadStatus("Failed to upload questions. Please try again.");
    }
  };

  const downloadSampleFile = () => {
    const sampleData = [
      ["Sno", "Question", "Answer"],
      ["1", "1,-2,2,3,2,5,6,-1", "2"],
      ["2", "1,2,3,4,5,6,7,8,9", "9"],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sample");

    XLSX.writeFile(wb, "Sample_Questions.xlsx");
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
                <h2 className="title">
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
                    <button className="upload-btn" onClick={handleUpload}>
                      Upload Excel file
                    </button>
                    <button className="download-btn" onClick={downloadSampleFile}>
                      📥 Download Sample File
                    </button>
                  </div>
                </div>

                {uploadStatus && <p>{uploadStatus}</p>}
                <div className="new-field d-flex align-items-center">
  <div className="form-group">
    <label htmlFor="level">Select Level:</label>
    <select
      id="level"
      value={level}
      onChange={(e) => setLevel(e.target.value)}
    >
      <option value={1}>Level 1</option>
      <option value={1}>Level 2</option>
      <option value={1}>Level 3</option>
      <option value={1}>Level 4</option>
      <option value={2}>Level 5</option>
      <option value={3}>Level 6</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="title"
      value={title}
      placeholder="Enter the answer"
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label htmlFor="description">Description:</label>
    <input
      type="text"
      id="description"
      value={description}
      placeholder="Add a note"
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
</div>

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
                  <a href="#" className="more-info ">For more info</a>
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
