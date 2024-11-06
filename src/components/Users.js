import React, { useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', phone: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: '', phone: '' });
  };

  return (
    <div>
      <div className="bg-white  rounded p-6 mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Add User</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="User Name"
            className="border border-gray-300 px-4 py-3 rounded mb-4 mr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="border border-gray-300 px-4 py-3 rounded mb-4 mr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddUser}
            className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary focus:outline-none transition duration-300"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded p-6 mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Users List</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-primary hover:text-white transition-all duration-300`}
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary focus:outline-none"
                    onClick={() => setUsers(users.filter((u) => u !== user))}
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
  );
};

export default Users;
