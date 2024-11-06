import React, { useState } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";


const RedirectIfLoggedIn = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUserData"));
  if (loggedUser) {
      // If user is logged in, redirect them based on their role
      return loggedUser.admin ? <Navigate to="/admin" /> : <Navigate to="/active-loan" />;
  }
  return children;
};

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
        <Route path="/" element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
        <Route path="/active-loan" element={<ProtectedRoute requiredRole="user"><ActiveLoanPage /></ProtectedRoute>} />
        <Route path="/loan-details" element={<ProtectedRoute requiredRole="user"><LoanDetailsPage /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute requiredRole="user"><PaymentPage /></ProtectedRoute>} />

        {/* Admin Route - This will contain the sidebar and navbar */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
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
                <div className="mt-0 w-[99%]">
                  {renderPage()}
                </div>
              </div>
            </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
