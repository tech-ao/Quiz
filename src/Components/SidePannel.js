import React from 'react';
import { Container, Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Style.css'; // Import custom CSS for styling
import { Link } from 'react-router-dom';

const SidePanel = () => {
  return (
    <div className="side-panel">   
    
      <ul className="nav flex-column">
     
        <li className="nav-item">
          <a href="/adminDashboard" className="nav-link active">
            <i className="bi bi-grid "></i> Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="bi bi-person"></i> Teacher
          </a>
        </li>
        <li className="nav-item">
          <a href="/studentList" className="nav-link active">
            <i className="bi bi-person"></i> Students
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="bi bi-patch-question"></i> Quiz
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="bi bi-journal-text"></i> Questions
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="bi bi-file-earmark-person"></i> Student Report
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="bi bi-file-earmark-bar-graph"></i> Top Student Report
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="bi bi-gear"></i> Settings
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="bi bi-clipboard"></i> More Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
