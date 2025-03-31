import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons"; // Import back icon
import RegisterHeader from "../Student/RegisterHeader";

const Pending = () => {
  const navigate = useNavigate();

  return (
    <div>
      <RegisterHeader />
      <div className="register-student-page registerbg-image">
        <div className="register-student-container text-center position-relative">
          {/* Back Button */}
          <Button 
            variant="link" 
            className="position-absolute top-0 start-0 m-3 text-dark" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={20} /> Back
          </Button>

          <h2 className="form-title text-danger mt-4">Your Status is Pending</h2>
          <p className="text-muted">
            Please contact your admin for further assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pending;
