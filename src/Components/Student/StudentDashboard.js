import React from "react";
import { Container, Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap';
import '../../Style.css'
import Sidebar from '../Admin/SidePannel';
import StudentHeader from "./StudentHeader";


const StudentDashboard = () => {
    return (
        <div>
            <StudentHeader />
            <div className="d-flex">
                <Sidebar />
                <Container fluid className="p-4 bg-light min-vh-100">
                    <div className="card"> </div>

                </Container>
            </div>
        </div>

    );
};

export default StudentDashboard;
