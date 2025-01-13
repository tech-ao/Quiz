import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { Container } from "react-bootstrap";
import "./AddTeacher.css";
import PersonalInformationForm from "./PersonalInformation";
import EducationAndExperienceForm from "./Education";
import AgreeAndSign from "./AgreeandSing";
import FranchiseRequirementsForm from "./Franchies";
import LegalComplianceForm from "./LegalCompliance";
import ReferencesAndResumeForm from "./Reference";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AddTeacher = () => {
  const [activeTab, setActiveTab] = useState("personalDetails");
  const [preferredCountry, setPreferredCountry] = useState("India");

  // Track the validity of each tab
  const [formValidity, setFormValidity] = useState({
    personalDetails: false,
    education: false,
    franchies: false,
    legalcompliance: false,
    reference: false,
    agreeSign: false,
  });

  const tabs = [
    { id: "personalDetails", title: "Personal Detail", icon: "fas fa-info-circle" },
    { id: "education", title: "Educational Qualification", icon: "fas fa-user-graduate" },
    { id: "franchies", title: "Franchise Requirement", icon: "fas fa-handshake" },
    ...(preferredCountry === "Other"
      ? [
          { id: "legalcompliance", title: "Legal and Compliance", icon: "fas fa-balance-scale" },
          { id: "reference", title: "References And Resume", icon: "fas fa-file-alt" },
        ]
      : []),
    { id: "agreeSign", title: "Agree and Sign", icon: "fas fa-check-circle" },
  ];

  const handleTabChange = (tabId) => {
    if (!formValidity[activeTab]) {
      alert(`Please complete the ${tabs.find((tab) => tab.id === activeTab).title} section before proceeding.`);
      return;
    }
    setActiveTab(tabId);
  };

  const updateTabValidity = (tabId, isValid) => {
    setFormValidity((prevValidity) => ({
      ...prevValidity,
      [tabId]: isValid,
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personalDetails":
        return (
          <PersonalInformationForm
            updateValidity={(isValid) => updateTabValidity("personalDetails", isValid)}
          />
        );
      case "education":
        return (
          <EducationAndExperienceForm
            updateValidity={(isValid) => updateTabValidity("education", isValid)}
            setPreferredCountry={setPreferredCountry}
          />
        );
      case "franchies":
        return (
          <FranchiseRequirementsForm
            updateValidity={(isValid) => updateTabValidity("franchies", isValid)}
          />
        );
      case "legalcompliance":
        return (
          <LegalComplianceForm
            updateValidity={(isValid) => updateTabValidity("legalcompliance", isValid)}
          />
        );
      case "reference":
        return (
          <ReferencesAndResumeForm
            updateValidity={(isValid) => updateTabValidity("reference", isValid)}
          />
        );
      case "agreeSign":
        return (
          <AgreeAndSign
            updateValidity={(isValid) => updateTabValidity("agreeSign", isValid)}
          />
        );
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="d-flex">
        <Sidebar />
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <div className="row">
              <div className="col-md-3">
                <div className="custom-sidebar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`custom-tab ${activeTab === tab.id ? "custom-tab-active" : ""}`}
                      onClick={() => handleTabChange(tab.id)}
                    >
                      <i className={`${tab.icon}`}></i>
                      <span>{tab.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-9">
                <div className="card shadow-sm">
                  <div className="card-body custom-card">{renderContent()}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddTeacher;
