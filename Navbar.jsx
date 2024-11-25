import React from "react";

const Navbar = ({ setActiveComponent }) => {
  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => setActiveComponent("Dashboard")}
      >
        BlockSafe
      </div>
      <ul className="navbar-links">
        <li onClick={() => setActiveComponent("Dashboard")}>Dashboard</li>
        <li onClick={() => setActiveComponent("FileUpload")}>File Upload</li>
        <li onClick={() => setActiveComponent("SignIn")}>Sign In</li>
        <li onClick={() => setActiveComponent("SignUp")}>Sign Up</li>
      </ul>
    </nav>
  );
};

export default Navbar;
