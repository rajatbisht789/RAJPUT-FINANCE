import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ActiveLoanPage from "./components/ActiveLoanPage";
import LoanDetailsPage from "./components/LoanDetailsPage";
import PaymentPage from "./components/PaymentPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Loans from "./components/Loans";
import Payments from "./components/Payments";
import Stats from "./components/Stats";

function App() {
  const [activePage, setActivePage] = useState('Users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  const renderPage = () => {
    switch (activePage) {
      case 'Users':
        return <Users />;
      case 'Loans':
        return <Loans />;
      case 'Payments':
        return <Payments />;
      case 'Stats':
        return <Stats />;
      default:
        return <Users />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/active-loan" element={<ActiveLoanPage />} />
        <Route path="/loan-details" element={<LoanDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Admin Route - This will contain the sidebar and navbar */}
        <Route 
          path="/admin" 
          element={
            <div className="flex">
              {/* Sidebar */}
              <Sidebar 
                setActivePage={setActivePage} 
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar} 
              />

              {/* Main content */}
              <div className={`flex-1 ml-0 transition-all duration-300`}>
                <Navbar />
                <div className="mt-6">
                  {renderPage()}
                </div>
              </div>
            </div>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
