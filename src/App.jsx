import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import FileUpload from "./Components/FileUpload";
import Dashboard from "./Components/Dashboard";
import "./App.css";

function App() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "FileUpload":
        return <FileUpload />;
      case "SignIn":
        return <SignIn />;
      case "SignUp":
        return <SignUp />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </div>
  );
}

export default App;
