import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Admin/SidePannel';
import AdminHeader from '../Admin/AdminHeader';
import { Container, Row, Col } from 'react-bootstrap';
import './AddTeacher.css';
import PersonalInformationForm from './PersonalInformation';
import EducationAndExperienceForm from './Education';
import AgreeAndSign from './AgreeandSing';
import FranchiseRequirementsForm from './Franchies';
import LegalComplianceForm from './LegalCompliance';
import ReferencesAndResumeForm from './Reference';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AddTeacher = () => {
  const [activeTab, setActiveTab] = useState('personalDetails');
  const [preferredCountry, setPreferredCountry] = useState('India');

  const tabs = [
    { id: 'personalDetails', title: 'Personal Detail', icon: 'fas fa-info-circle' },
    { id: 'education', title: 'Educational Qualification', icon: 'fas fa-user-graduate' },
    { id: 'franchies', title: 'Franchise Requirement', icon: 'fas fa-handshake' },
    ...(preferredCountry === 'Other'
      ? [
        { id: 'legalcompliance', title: 'Legal and Compliance', icon: 'fas fa-balance-scale' },
        { id: 'reference', title: 'References And Resume', icon: 'fas fa-file-alt' },
      ]
      : []),
    { id: 'agreeSign', title: 'Agree and Sign', icon: 'fas fa-check-circle' },
  ];


  const renderContent = () => {
    switch (activeTab) {
      case 'personalDetails':
        return <PersonalInformationForm />;
      case 'education':
        return <EducationAndExperienceForm section="education" setPreferredCountry={setPreferredCountry} />;
      case 'franchies':
        return <FranchiseRequirementsForm section="franchies" />;
      case 'legalcompliance':
        return <LegalComplianceForm section="legalcompliance" />;
      case 'reference':
        return <ReferencesAndResumeForm section="reference" />;
      case 'agreeSign':
        return <AgreeAndSign section="agreeSign" />;
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
              {/* Sidebar Tabs */}

              <div className="col-md-9">
                <div className="card shadow-sm">
                  <div className="card-body custom-card">
                    <div className="col-md-3">
                      <div className="custom-sidebar">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            className={`custom-tab ${activeTab === tab.id ? 'custom-tab-active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            <i className={`${tab.icon}`}></i>
                            <span>{tab.title}</span>
                          </button>
                        ))}
                      </div>

                    </div>
                    {renderContent()}</div>
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
