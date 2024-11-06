// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");  // Redirect to the login page
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-background">Rajput Finance</h1>
      <button
        onClick={handleLogout}
        className="bg-accent hover:bg-secondary text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
