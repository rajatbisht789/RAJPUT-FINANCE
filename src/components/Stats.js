import React from 'react';

const Stats = () => {
  return (
    <div className="bg-white rounded p-6 mb-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Finance Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-primary text-white p-6 rounded-lg">
          <h3 className="text-xl">Pending Loans</h3>
          <p className="text-3xl">23</p>
        </div>
        <div className="bg-secondary text-white p-6 rounded-lg">
          <h3 className="text-xl">Closed Loans</h3>
          <p className="text-3xl">57</p>
        </div>
        <div className="bg-tertiary text-white p-6 rounded-lg">
          <h3 className="text-xl">Total Amount</h3>
          <p className="text-3xl">₹10,50,000</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
