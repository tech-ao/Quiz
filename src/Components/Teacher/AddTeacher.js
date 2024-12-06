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

const AddTeacher = () => {
  const [activeTab, setActiveTab] = useState('personalDetails');
  const [preferredCountry, setPreferredCountry] = useState('India');

  const tabs = [
    { id: 'personalDetails', title: 'Personal Detail' },
    { id: 'education', title: 'Educational Qualification' },
    { id: 'franchies', title: 'Franchise Specific Requirement' },
    ...(preferredCountry === 'Other'
      ? [
          { id: 'legalcompliance', title: 'Legal and Compliance' },
          { id: 'reference', title: 'References And Resume' },
        ]
      : []),
    { id: 'agreeSign', title: 'Agree and Sign' },
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
        <Container fluid className="p-4 maincontainerbg min-vh-100">
          <div className="row">
            {/* Sidebar Tabs */}
            <div className="col-md-3">
              <div className="list-group custom-sidebar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`list-group-item list-group-item-action custom-tab ${activeTab === tab.id ? 'custom-tab-active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.title}
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
        </Container>
      </div>
    </div>
  );
};

export default AddTeacher;
