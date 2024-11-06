import React, { useState } from 'react';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({
    loanId: '',
    amount: '',
    status: 'Pending',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleAddPayment = () => {
    setPayments([...payments, payment]);
    setPayment({ loanId: '', amount: '', status: 'Pending' });
  };

  return (
    <div>
      <div className="bg-white rounded p-6 mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Create Payment</h2>
        <div className="mb-4">
          <input
            type="text"
            name="loanId"
            value={payment.loanId}
            onChange={handleInputChange}
            placeholder="Loan ID"
            className="border border-gray-300 px-4 py-3 rounded mr-4 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            name="amount"
            value={payment.amount}
            onChange={handleInputChange}
            placeholder="Payment Amount"
            className="border border-gray-300 px-4 py-3 rounded mr-4 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddPayment}
            className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary focus:outline-none transition duration-300"
          >
            Add Payment
          </button>
        </div>
      </div>

      <div className="bg-white rounded p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Payments List</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-3">Loan ID</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-primary hover:text-white transition-all duration-300`}
              >
                <td className="px-6 py-4">{payment.loanId}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
