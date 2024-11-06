// src/components/PaymentPage.js
import React, { useState } from "react";
import Navbar from "./Navbar";  // assuming Navbar is already created

function PaymentPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [emiDetails, setEmiDetails] = useState(null);
  const [upiReference, setUpiReference] = useState("");  // State for UPI reference number
  const [isSubmitted, setIsSubmitted] = useState(false);  // Flag to check if the reference is submitted

  // Mocked EMI schedule data (replace with actual data from props or state)
  const emiSchedule = [
    { date: "2024-11-10", amount: 2000, status: "unpaid" },
    { date: "2024-12-10", amount: 2000, status: "unpaid" },
    // Add more scheduled EMIs here
  ];

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    // Check if there's an EMI due on this date
    const emi = emiSchedule.find((emi) => emi.date === date && emi.status === "unpaid");
    setEmiDetails(emi || null);
  };

  const handleSubmitReference = () => {
    // Handle submission of the UPI reference number (e.g., sending it to the server)
    if (upiReference.trim()) {
      alert("UPI Reference submitted successfully. Awaiting admin verification.");
      setIsSubmitted(true);  // Mark as submitted
    } else {
      alert("Please enter a valid UPI reference number.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primary mb-4">EMI Payment</h2>

        {/* Date Picker for selecting EMI payment date */}
        <label className="block mb-2 text-primary text-lg">
          Select Payment Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mb-4 p-2 border rounded w-full max-w-xs bg-white"
        />

        {emiDetails ? (
          <div className="mt-4 p-6 border rounded shadow-md bg-white">
            <h3 className="text-xl font-semibold text-primary mb-2">EMI Details</h3>
            <p>Amount Due: ₹{emiDetails.amount}</p>
            <p>Status: {emiDetails.status}</p>

            {/* Display QR Code or Payment Gateway Button */}
            <div className="mt-4">
              <p className="text-lg text-secondary mb-2">Scan QR Code to Pay</p>
              <div className="border p-4 rounded bg-gray-100 inline-block">
                {/* Placeholder for QR code - replace with actual QR code */}
                <img src="path_to_qr_code.png" alt="QR Code" className="w-32 h-32" />
              </div>

              {/* Input field for UPI Reference Number */}
              {!isSubmitted && (
                <div className="mt-4">
                  <label htmlFor="upiReference" className="block text-primary mb-2">
                    Enter UPI Reference Number:
                  </label>
                  <input
                    type="text"
                    id="upiReference"
                    value={upiReference}
                    onChange={(e) => setUpiReference(e.target.value)}
                    className="mb-4 p-2 border rounded w-full max-w-xs bg-white"
                    placeholder="Enter UPI Reference Number"
                  />
                  <button
                    onClick={handleSubmitReference}
                    className="bg-accent hover:bg-secondary text-white px-4 py-2 rounded ml-2"
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Show confirmation message if the reference is submitted */}
              {isSubmitted && (
                <p className="mt-4 text-green-500 font-semibold">
                  Your UPI Reference Number has been submitted for verification.
                </p>
              )}
            </div>
          </div>
        ) : (
          selectedDate && (
            <p className="text-red-500 mt-4">
              No unpaid EMI is scheduled for the selected date.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
