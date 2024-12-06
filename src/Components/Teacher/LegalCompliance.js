import React from "react";
import { Form, Row, Col,Container, Button } from "react-bootstrap";

const LegalComplianceForm = () => {
  return (
    <Container className="p-4 bg-light">
      <h5>Legal and Compliance Information (only for other countries)</h5>
      <Form>
        {/* Row 1: Criminal Background Check and Work Authorization */}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Criminal Background Check</Form.Label>
              <Form.Select>
                <option value="done">Done</option>
                <option value="not-done">Not Done</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Work Authorization (L2 / L1 visa)</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
        </Row>

        {/* Row 2: Health and Medical Fitness and NDA */}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Health and Medical Fitness (TB test)</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Non-Disclosure Agreement (NDA)</Form.Label>
              <Form.Select>
                <option value="signed">Signed</option>
                <option value="not-signed">Not Signed</option>
              </Form.Select>
              <Form.Control type="file" className="mt-2" />
            </Form.Group>
          </Col>
        </Row>

        {/* Row 3: Proof of Address */}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Proof of Address (e.g., utility bill, lease agreement)</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons: Back, Save, and Next */}
        <Row className="mt-4">
          <Col sm={3}>
            <Button variant="secondary" className="w-100">
              Back
            </Button>
          </Col>
          <Col sm={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
            <Button variant="primary" className="me-2">
              Save
            </Button>
            <Button variant="success">
              Next
            </Button>
          </Col>
        </Row>
      </Form>
   </Container>
  );
};

export default LegalComplianceForm;
