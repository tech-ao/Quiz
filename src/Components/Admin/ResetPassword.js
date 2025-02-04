import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import SidePannel from "./SidePannel";
import "./resetpassword.css"; // Import external CSS file

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Add this state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password successfully updated!");
    navigate("/password");
  };

  return (
    <div className="reset-password-layout">
      {/* Pass toggleSidebar function to AdminHeader */}
      <AdminHeader toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />

      <div className="d-flex">
        {/* Sidebar visibility controlled by state */}
        {isSidebarVisible && <SidePannel />}

        {/* Main content */}
        <div className="reset-password-container min-vh-100">
          <div className="reset-password-box">
            <h2 className="reset-password-title">Reset Password</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
              <div className="reset-password-field">
                <label className="reset-password-label">Current Password:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="reset-password-input"
                  required
                />
              </div>

              <div className="reset-password-field">
                <label className="reset-password-label">New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="reset-password-input"
                  required
                />
              </div>

              <div className="reset-password-field">
                <label className="reset-password-label">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="reset-password-input"
                  required
                />
              </div>

              <button type="submit" className="reset-password-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;