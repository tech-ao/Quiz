import React, { useState, useEffect } from "react";
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
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [csvFile, setCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

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

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target.result;
      const questionBase64 = btoa(fileContent);

      const requestBody = {
        questionBase64: questionBase64,
        title: "Your Title Here", 
        level: 1, 
        description: "Your Description Here", 
      };

      try {
        const response = await fetch("http://santhwanamhhcs.in:8081/api/ImportExcel/ImportQuestion", {
          method: "POST",
          headers: {
            accept: "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to upload questions");
        }

        const result = await response.json();
        setUploadStatus("Questions uploaded successfully!");
        console.log("Upload result:", result);
      } catch (error) {
        console.error("Error uploading questions:", error);
        setUploadStatus("Failed to upload questions. Please try again.");
      }
    };

    reader.readAsText(csvFile);
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
                  Import Questions <span className="subtitle">upload using CSV file</span>
                </h2>
              </div>
              <div className="Content-box">
                <div className="upload-box">
                  <label htmlFor="csvFile">CSV Questions file</label>
                  <input type="file" id="csvFile" accept=".csv" onChange={handleFileChange} />
                  <div className="button-group">
                    <button className="upload-btn" onClick={handleUpload}>Upload CSV file</button>
                    <button className="download-btn">📥 Download Sample File</button>
                  </div>
                </div>

                {uploadStatus && <p>{uploadStatus}</p>}

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