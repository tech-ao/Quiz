import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import * as XLSX from "xlsx";
import "./ImportQuestion.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";

const ImportQuestion = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);

  const BASE_URL = "http://srimathicare.in:8081";
  const API_URL_IMPORT = `${BASE_URL}/api/ImportExcel/ImportQuestion`;

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  // ✅ Convert Excel File to Base64 (Browser-Safe Method)
  const convertExcelToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read as Base64 directly
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
        questionBase64,
        title: "questions",
        level: 1,
        description: "Excel file for questions",
      };

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
      setUploadStatus("✅ Questions uploaded successfully!");
      console.log("Upload result:", result);
      setExcelFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading questions:", error);
      setUploadStatus("❌ Failed to upload questions. Please try again.");
    }
  };

  // Download Sample Excel Template
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
                  />

                  <div className="button-group">
                    <button className="upload-btn" onClick={handleUpload}>
                      📤 Upload Excel file
                    </button>
                    <button className="download-btn" onClick={downloadSampleFile}>
                      📥 Download Sample File
                    </button>
                  </div>
                </div>

                {uploadStatus && <p>{uploadStatus}</p>}

                <div className="instructions">
                  <h3>Instructions for Excel Upload</h3>
                  <ol>
                    <li>Ensure the first row contains column headers.</li>
                    <li>Save the file in .xlsx format.</li>
                    <li>Download the sample file for the correct format.</li>
                    <li>Ensure there are no empty rows in between.</li>
                  </ol>
                  <a href="#" className="more-info">
                    For more info
                  </a>
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
