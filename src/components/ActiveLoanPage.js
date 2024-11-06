// src/components/ActiveLoanPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";  

function ActiveLoanPage() {
  const navigate = useNavigate();
  const loans = [
    { mobileName: "iPhone 14", fileNumber: "001", emi: "2000" },
    { mobileName: "Samsung Galaxy", fileNumber: "002", emi: "1800" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />  
      <div className="p-3">
        <h2 className="text-3xl font-bold text-primary mb-6">Active Loans</h2>
        <table className="w-full bg-white rounded shadow-lg overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3">Mobile Name</th>
              <th className="p-3">File Number</th>
              <th className="p-3">EMI</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-3">{loan.mobileName}</td>
                <td className="p-3">{loan.fileNumber}</td>
                <td className="p-3">{loan.emi}</td>
                <td className="p-3">
                  <button
                    className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary"
                    onClick={() => navigate("/loan-details", { state: { loan } })}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveLoanPage;
