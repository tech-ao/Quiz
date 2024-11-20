import React from "react";
import '../Style.css'

const StudentHeader = () => {
  return (
    <header className="header">
      <div className="logo">SpellBytes</div>
      <nav>
        <ul className="nav-links">
          <li>Spelling Bee</li>
          <li>Associate Partner</li>
          <li>Learning Portal</li>
          <li>SIO 2024</li>
          <li>Blog</li>
          <li>Contact Us</li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn">Portal Login</button>
        <button className="subscribe-btn">Subscribe</button>
      </div>
    </header>
  );
};

export default StudentHeader;
