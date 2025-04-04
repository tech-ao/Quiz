import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../redux/Services/Config";
import { toast } from "react-toastify";

const ViewTeacher = ({ show, onClose, teacherData }) => {
  console.log("this is from view teachers", teacherData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [documentData, setDocumentData] = useState({});
  const [blobUrls, setBlobUrls] = useState({});
  
  // Document type name mapping
  const DOCUMENT_TYPE_NAMES = {
    4: "Resume",
    5: "Educational Certificates",
    6: "Experience Certificates",
    8: "Candidate Photo"
  };

  // Clean up function to revoke all blob URLs
  const cleanUpBlobUrls = () => {
    Object.values(blobUrls).forEach(url => {
      URL.revokeObjectURL(url);
    });
    setBlobUrls({});
  };

  // Reset states when component shows
  useEffect(() => {
    if (show) {
      setDocumentData({});
      setError("");
      setLoading(true);
      
      if (teacherData && teacherData.teacherId && teacherData.teacherDocumentFileModels) {
        fetchDocuments();
      } else {
        setLoading(false);
      }
    }
    
    // Cleanup function
    return () => {
      cleanUpBlobUrls();
    };
  }, [show, teacherData]);

  const fetchDocuments = async () => {
    if (!teacherData || !teacherData.teacherDocumentFileModels) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    // Clean up previous blob URLs before creating new ones
    cleanUpBlobUrls();
    
    const documents = {};
    const newBlobUrls = {};
    
    try {
      // Process all documents in teacherDocumentFileModels
      for (const doc of teacherData.teacherDocumentFileModels) {
        const { teacherId, documentTypeId } = doc;
        
        try {
          const response = await axios.get(
            `${BASE_URL}/Teacher/GetTeacherDocument?Id=${teacherId}&documentTypeEnum=${documentTypeId}`,
            {
              headers: {
                Accept: "text/plain",
                "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
                AccessToken: "123",
              },
            }
          );
          
          if (response.data && response.data.data) {
            const base64Content = response.data.data.base64Content || response.data.data;
            
            // Store document data
            documents[documentTypeId] = {
              ...doc,
              base64Content
            };
            
            // Create blob URL for PDF documents
            if (doc.extension.toLowerCase() === 'pdf' && base64Content) {
              try {
                const binaryString = window.atob(base64Content);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                  bytes[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(blob);
                newBlobUrls[documentTypeId] = blobUrl;
                console.log(`Created blob URL for document type ${documentTypeId}: ${blobUrl}`);
              } catch (blobError) {
                console.error(`Error creating blob for document type ${documentTypeId}:`, blobError);
              }
            }
          }
        } catch (err) {
          console.error(`Error fetching document type ${documentTypeId}:`, err);
        }
      }
      
      setDocumentData(documents);
      setBlobUrls(newBlobUrls);
      console.log("Document data loaded:", documents);
      console.log("Blob URLs created:", newBlobUrls);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dob) => {
    return dob ? new Date(dob).toLocaleDateString() : "N/A";
  };

  const renderDocument = (documentTypeId) => {
    const doc = documentData[documentTypeId];
    
    if (!doc || !doc.base64Content) {
      return <p>Document not available</p>;
    }

    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(doc.extension.toLowerCase());
    const isPdf = doc.extension.toLowerCase() === 'pdf';
    
    if (isImage) {
      return (
        <img 
          src={`data:image/${doc.extension};base64,${doc.base64Content}`}
          alt={doc.name}
          style={{ maxWidth: '100%', maxHeight: '300px' }}
        />
      );
    } else if (isPdf) {
      const pdfUrl = blobUrls[documentTypeId];
      
      if (!pdfUrl) {
        return <p>Error loading PDF. Please try again.</p>;
      }
      
      return (
        <div className="pdf-container">
          <p className="fw-bold mb-2">{doc.name}</p>
          <div className="pdf-viewer-wrapper border rounded">
            <object
              data={pdfUrl}
              type="application/pdf"
              width="100%"
              height="500px"
              className="pdf-viewer"
              key={`pdf-${documentTypeId}-${Date.now()}`} // Add a unique key to force re-render
            >
              <div className="p-3">
                <p>It appears you don't have a PDF plugin for this browser.</p>
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Click here to open the PDF
                </a>
              </div>
            </object>
          </div>
          <div className="mt-2">
            <a 
              href={pdfUrl}
              download={doc.name}
              className="btn btn-sm btn-primary me-2"
            >
              Download PDF
            </a>
            <a 
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-info"
            >
              Open in New Tab
            </a>
          </div>
        </div>
      );
    } else {
      return <p>Unsupported file type: {doc.extension}</p>;
    }
  };

  const updateStatus = async (statusEnum) => {
    try {
      setIsUpdating(true);
      if (!teacherData || !teacherData.teacherId) {
        toast.error("No teacher data available.");
        return;
      }
      const requestBody = {
        statusEnum,
        teacherIdList: [teacherData.teacherId],
      };

      await axios.post(`${BASE_URL}/Teacher/UpdateTeacherStatus`, requestBody, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
        },
      });
      toast.success("Status updated successfully!");
      onClose(); // Close the offcanvas after successful update
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleApprove = () => {
    updateStatus(1);
  };

  const handleDeny = () => {
    updateStatus(2);
  };

  // Generate document sections dynamically
  const renderDocumentSections = () => {
    if (!teacherData || !teacherData.teacherDocumentFileModels || teacherData.teacherDocumentFileModels.length === 0) {
      return <p>No documents available</p>;
    }

    // Group documents by type
    const documentsByType = {};
    teacherData.teacherDocumentFileModels.forEach(doc => {
      documentsByType[doc.documentTypeId] = doc;
    });

    return (
      <div className="document-sections">
        {Object.keys(documentsByType).map(typeId => {
          const docTypeId = parseInt(typeId);
          // Skip photo document as it's displayed separately
          if (docTypeId === 8) return null;
          
          const docTypeName = DOCUMENT_TYPE_NAMES[docTypeId] || `Document Type ${docTypeId}`;
          
          return (
            <div className="document-section mb-4" key={`doc-section-${docTypeId}`}>
              <h6 className="mb-3">{docTypeName}</h6>
              <div className="document-container">
                {documentData[docTypeId] ? renderDocument(docTypeId) : <p>No {docTypeName.toLowerCase()} available</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Special case for candidate photo rendering
  const renderCandidatePhoto = () => {
    // Find photo document type from teacherDocumentFileModels
    const photoDoc = teacherData?.teacherDocumentFileModels?.find(doc => doc.documentTypeId === 8);
    return photoDoc && documentData[8] ? renderDocument(8) : <p>No photo available</p>;
  };

  // Handle close with cleanup
  const handleClose = () => {
    onClose();
  };

  return (
    <Offcanvas 
      show={show} 
      onHide={handleClose} 
      placement="end" 
      className="teacher-view-offcanvas" 
      style={{ width: "700px", maxWidth: "90%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>View Teacher Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {loading && <div className="text-center py-3"><p>Loading teacher documents...</p></div>}
        {error && <div className="alert alert-danger">{error}</div>}
        
        <h5 className="border-bottom pb-2 mb-3">Personal Information</h5>
        <Row className="mb-3">
          <Col>
            <strong>Full Name:</strong>
            <p>{teacherData?.fullName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Date of Birth:</strong>
            <p>{formatDate(teacherData?.dob)}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Gender:</strong>
            <p>{teacherData?.genderName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Register Number:</strong>
            <p>{teacherData?.teacherRegno || teacherData?.registerNo || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Phone Number:</strong>
            <p>
              {teacherData?.countryCode ? teacherData.countryCode + " " : ""}
              {teacherData?.phoneNumber || "N/A"}
            </p>
          </Col>
          <Col>
            <strong>Email:</strong>
            <p>{teacherData?.email || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Nationality:</strong>
            <p>{teacherData?.nationalityName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Candidate Photo:</strong>
            <div className="document-container mt-2">
              {renderCandidatePhoto()}
            </div>
          </Col>
        </Row>

        {/* Address Information */}
        <h5 className="border-bottom pb-2 mb-3 mt-4">Address Information</h5>
        <Row className="mb-3">
          <Col>
            <strong>Permanent Address:</strong>
            <p>{teacherData?.permanentAddress || "N/A"}</p>
          </Col>
          <Col>
            <strong>Current Residential Address:</strong>
            <p>{teacherData?.currentResidentialAddress || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Same As Permanent Address:</strong>
            <p>{teacherData?.sameAsPermanentAddress ? "Yes" : "No"}</p>
          </Col>
        </Row>

        <h5 className="border-bottom pb-2 mb-3 mt-4">Education Qualification</h5>
        <Row className="mb-3">
          <Col>
            <strong>Highest Level Education:</strong>
            <p>{teacherData?.educationQualificationModel?.higherLevelEducation || "N/A"}</p>
          </Col>
          <Col>
            <strong>Institute Attended:</strong>
            <p>{teacherData?.educationQualificationModel?.institute || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Degrees/Certifications:</strong>
            <p>{teacherData?.degrees || "N/A"}</p>
          </Col>
          <Col>
            <strong>Subject Specialist:</strong>
            <p>{teacherData?.educationQualificationModel?.subjectSpecialist || "N/A"}</p>
          </Col>
        </Row>

        <h5 className="border-bottom pb-2 mb-3 mt-4">Professional Experience</h5>
        <Row className="mb-3">
          <Col>
            <strong>Year of Graduation:</strong>
            <p>{teacherData?.educationQualificationModel?.yearOfGraduation || "N/A"}</p>
          </Col>
          <Col>
            <strong>Employer Name:</strong>
            <p>{teacherData?.professionalExperianceModel?.employerName || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Job Title:</strong>
            <p>{teacherData?.professionalExperianceModel?.jobTitle || "N/A"}</p>
          </Col>
          <Col>
            <strong>Years of Experience:</strong>
            <p>{teacherData?.professionalExperianceModel?.yoe || "N/A"}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Preferred Countries:</strong>
            <p>{teacherData?.preferedCountryName || "N/A"}</p>
          </Col>
        </Row>

        {/* Availability & Work Details */}
        <h5 className="border-bottom pb-2 mb-3 mt-4">Availability & Work Details</h5>
        <Row className="mb-3">
          <Col>
            <strong>Availability:</strong>
            <p>{teacherData?.availabilityName || "N/A"}</p>
          </Col>
          <Col>
            <strong>Teaching Mode:</strong>
            <p>{teacherData?.teacherModeName || "N/A"}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <strong>Work Schedule:</strong>
            <p>{teacherData?.preferedWorkScheduledName || "N/A"}</p>
          </Col>
        </Row>

        {/* Document & Media - Rendered dynamically */}
        <h5 className="border-bottom pb-2 mb-3 mt-4">Documents</h5>
        {renderDocumentSections()}

        <div className="d-flex justify-content-center mt-4 mb-3">
          <Button variant="success" onClick={handleApprove} className="me-3 px-4" disabled={isUpdating}>
            {isUpdating ? "Processing..." : "Approve"}
          </Button>
          <Button variant="danger" onClick={handleDeny} className="px-4" disabled={isUpdating}>
            {isUpdating ? "Processing..." : "Reject"}
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ViewTeacher;