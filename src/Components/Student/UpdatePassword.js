import React, { useState } from "react";

const PasswordChangePopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
            <div style={{ width: "100%" }}>
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
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                  "&:focus": {
                    borderColor: "#666",
                    boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
                  },
                }}
                required
                autoFocus
              />
            </div>

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={isPasswordVerified}
              style={{
                width: "80%",
                padding: "8px",
                backgroundColor: isPasswordVerified ? "#cccccc" : "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isPasswordVerified ? "default" : "pointer",
                marginTop: "0.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                ":hover:not(:disabled)": {
                  backgroundColor: "#ca1818",
                },
              }}
            >
              {isPasswordVerified ? "Verified" : "Verify Password"}
            </button>

            {/* New Password Input */}
            <div style={{ width: "100%" }}>
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
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backgroundColor: !isPasswordVerified ? "#f5f5f5" : "white",
                  "&:focus": {
                    borderColor: "#666",
                    boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
                  },
                }}
                required
                disabled={!isPasswordVerified}
              />
            </div>

            {/* Confirm Password Input */}
            <div style={{ width: "100%" }}>
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
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backgroundColor: !isPasswordVerified ? "#f5f5f5" : "white",
                  "&:focus": {
                    borderColor: "#666",
                    boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
                  },
                }}
                required
                disabled={!isPasswordVerified}
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={!isPasswordVerified}
              style={{
                width: "80%",
                padding: "8px",
                backgroundColor: !isPasswordVerified ? "#cccccc" : "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: !isPasswordVerified ? "default" : "pointer",
                marginTop: "0.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                ":hover:not(:disabled)": {
                  backgroundColor: "#ca1818",
                },
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