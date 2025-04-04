import React, { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const PasswordChangePopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password update submitted:", formData);
  };

  const handleVerify = () => {
    setIsPasswordVerified(true);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          width: "90%",
          maxWidth: "400px",
          minHeight: "300px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#666",
            zIndex: 1001,
          }}
        >
          ✕
        </button>

        <div style={{ padding: "16px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Change Password
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            {/* Old Password Input */}
            <div style={{ width: "100%", position: "relative" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                  color: "#333",
                }}
              >
                Old Password
              </label>
              <input
                type={showPassword.oldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px 32px 8px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  outline: "none",
                }}
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("oldPassword")}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "32px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                  padding: "4px",
                }}
              >
                {showPassword.oldPassword ? (
                  <EyeSlash size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={isPasswordVerified}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: isPasswordVerified ? "#86efac" : "#f87171",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isPasswordVerified ? "default" : "pointer",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              {isPasswordVerified ? "Verified" : "Verify Password"}
            </button>

            {/* New Password Input */}
            <div style={{ width: "100%", position: "relative" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                  color: "#333",
                }}
              >
                New Password
              </label>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px 32px 8px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  backgroundColor: !isPasswordVerified ? "#f5f5f5" : "white",
                  outline: "none",
                }}
                required
                disabled={!isPasswordVerified}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "32px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                  padding: "4px",
                }}
              >
                {showPassword.newPassword ? (
                  <EyeSlash size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div style={{ width: "100%", position: "relative" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                  color: "#333",
                }}
              >
                Confirm Password
              </label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px 32px 8px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  backgroundColor: !isPasswordVerified ? "#f5f5f5" : "white",
                  outline: "none",
                }}
                required
                disabled={!isPasswordVerified}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "32px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                  padding: "4px",
                }}
              >
                {showPassword.confirmPassword ? (
                  <EyeSlash size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={!isPasswordVerified}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: !isPasswordVerified ? "#cccccc" : "#f87171",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: !isPasswordVerified ? "default" : "pointer",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangePopup;