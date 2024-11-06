import React from 'react';

const Sidebar = ({ setActivePage, isSidebarOpen, toggleSidebar }) => {
  
  return (
    <div>
      {/* Sidebar */}
      {/* Sidebar Toggle Button for Mobile */}
      <button
          onClick={toggleSidebar}
          className={`absolute top-4 ${
          isSidebarOpen ? 'ml-52' : 'ml-1'} transition-all duration-300 ease-in-out  bg-secondary text-white p-2 rounded-full`}
        >
          {isSidebarOpen ? '←' : '→'} {/* Arrow changes based on the sidebar state */}
        </button>
      <div
        className={`h-screen ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } bg-primary text-white p-5 top-0 left-0 transition-all duration-300 ease-in-out`}
      >
        

        {/* Sidebar Links */}
        {isSidebarOpen && <ul className="mt-20 space-y-10">
          <li
            className={`cursor-pointer ${isSidebarOpen ? 'text-xl' : ''}`}
            onClick={() => setActivePage('Users')}
          >
            Users
          </li>
          <li
            className={`cursor-pointer ${isSidebarOpen ? 'text-xl' : ''}`}
            onClick={() => setActivePage('Loans')}
          >
            Loans
          </li>
          <li
            className={`cursor-pointer ${isSidebarOpen ? 'text-xl' : ''}`}
            onClick={() => setActivePage('Payments')}
          >
            Payments
          </li>
          <li
            className={`cursor-pointer ${isSidebarOpen ? 'text-xl' : ''}`}
            onClick={() => setActivePage('Stats')}
          >
            Statistics
          </li>
        </ul> }
      </div>

      {/* Overlay when Sidebar is open (on mobile) */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className=" inset-0"
        />
      )}
    </div>
  );
};

export default Sidebar;
