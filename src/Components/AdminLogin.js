import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import '../Style.css';
import logo from '../Components/images/Logo.png';

const AdminLoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State to display error messages
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("https://appsail-10091564320.development.catalystappsail.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful:", data);   
        navigate("/adminDashboard"); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please check your connection.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-card border border-success rounded-3 p-4 bg-white shadow">
        <div className="text-center mb-4">
          <img className="logo" src={logo} alt="Math Gym Logo" />
          <h2 className="text-success">WELCOME TO MATH GYM</h2>
          <small className="text-muted">Admin Login to Quizlab Dashboard</small>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">
              User ID
            </label>
            <input
              type="text"
              className="form-control"
              id="userId"
              placeholder="Enter your User ID"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-link position-absolute top-50 end-0 translate-middle-y p-0"
              onClick={() => setShowPassword(!showPassword)}
              style={{ textDecoration: "none", color: "gray" }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <a href="#!" className="forgot-password text-decoration-none">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
