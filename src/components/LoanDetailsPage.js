// src/components/LoanDetailsPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";  

function LoanDetailsPage() {
  const location = useLocation();
  const loan = location.state?.loan;
  const navigate = useNavigate();

  const schedule = [
    { date: "2024-01-10", amount: "2000", status: "Paid" },
    { date: "2024-02-10", amount: "2000", status: "Unpaid" }
  ];

  return (
    <div className="bg-background min-h-screen">
        <Navbar /> 
        <div className="p-3"> 
            <h2 className="text-3xl font-bold text-primary mb-4">Loan Details</h2>
            <div className="bg-white p-4 rounded shadow-lg mb-6">
                <p><strong>Mobile Name:</strong> {loan?.mobileName}</p>
                <p><strong>File Number:</strong> {loan?.fileNumber}</p>
                <p><strong>Total Loan Amount:</strong> 20000</p>
                <p><strong>Number of EMIs:</strong> 10</p>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Repayment Schedule</h3>
            <table className="w-full bg-white rounded shadow-lg overflow-hidden">
                <thead className="bg-primary text-white">
                <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                </tr>
                </thead>
                <tbody>
                {schedule.map((item, index) => (
                    <tr key={index} className="text-center border-b">
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.amount}</td>
                    <td className="p-3">{item.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button
                className="bg-accent text-white py-2 px-6 rounded mt-4 hover:bg-secondary"
                onClick={() => navigate("/payment")}
            >
                Pay EMI
            </button>
      </div>
    </div>
  );
}

export default LoanDetailsPage;
