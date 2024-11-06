import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate();  // Use the useNavigate hook
  const location = useLocation();
  // Determine whether we are on the admin page
  const isAdmin = location.pathname.includes('/admin');

  const handleLogout = () => {
    // Perform any logout operations here
    navigate('/');  // Navigate to the login page after logout
  };

  const handleToggle = () => {
    if (isAdmin) {
      navigate('/active-loan'); // Navigate to customer view
    } else {
      navigate('/admin'); // Navigate to admin view
    }
  };

  return (
    <div className="bg-primary p-4 shadow-md flex items-center justify-between">
      <h1 className="text-white text-2xl font-semibold">Rajput Finance</h1>
      <div>
      <button
          onClick={handleToggle}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded"
        >
          {isAdmin ? 'Customer' : 'Admin'}
        </button>
      <button
        onClick={handleLogout}  // Call the navigate function on click
        className="bg-red-500 text-white ml-3 px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Navbar;
