import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ActiveLoanPage from "./components/ActiveLoanPage";
import LoanDetailsPage from "./components/LoanDetailsPage";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/active-loan" element={<ActiveLoanPage />} />
        <Route path="/loan-details" element={<LoanDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
