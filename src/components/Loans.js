import React, { useState } from 'react';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({
    mobileName: '',
    fileNumber: '',
    emiAmount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoan({ ...newLoan, [name]: value });
  };

  const handleAddLoan = () => {
    setLoans([...loans, newLoan]);
    setNewLoan({ mobileName: '', fileNumber: '', emiAmount: '' });
  };

  return (
    <div>
      <div className="bg-white rounded p-6 mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Create Loan</h2>
        <div className="mb-4">
          <input
            type="text"
            name="mobileName"
            value={newLoan.mobileName}
            onChange={handleInputChange}
            placeholder="Mobile Name"
            className="border border-gray-300 px-4 py-3 mr-4 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="fileNumber"
            value={newLoan.fileNumber}
            onChange={handleInputChange}
            placeholder="File Number"
            className="border border-gray-300 px-4 py-3 mr-4 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="emiAmount"
            value={newLoan.emiAmount}
            onChange={handleInputChange}
            placeholder="EMI Amount"
            className="border border-gray-300 px-4 py-3 mr-4 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddLoan}
            className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary focus:outline-none transition duration-300"
          >
            Add Loan
          </button>
        </div>
      </div>
      <style>
        {`
          /* Media query for mobile devices */
          @media (max-width: 640px) {
            .mobile-width {
              width: 350px;
            }
          }
        `}
      </style>
    <div className="w-full bg-white rounded p-6 mb-6 mobile-width">
      <h2 className="text-2xl font-semibold text-primary mb-4">Loans List</h2>
      <div className="overflow-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-3">Mobile Name</th>
              <th className="px-6 py-3">File Number</th>
              <th className="px-6 py-3">EMI Amount</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-primary hover:text-white transition-all duration-300`}
              >
                <td className="px-6 py-4">{loan.mobileName}</td>
                <td className="px-6 py-4">{loan.fileNumber}</td>
                <td className="px-6 py-4">{loan.emiAmount}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary focus:outline-none"
                    onClick={() => setLoans(loans.filter((l) => l !== loan))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </div>
  );
};

export default Loans;
