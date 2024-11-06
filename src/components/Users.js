import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id : '', userName: '', phoneNumber: '', admin: false });

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = () => {
    axios.get('http://localhost:8080/rajputFinance/api/user/getAllUser')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the User data!", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser({
      ...newUser,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddUser = (e) => {
    axios.post('http://localhost:8080/rajputFinance/api/user/createNewUser', newUser)
      .then(response => {
        fetchAllUser();
      })
      .catch(error => {
        console.error("There was an error fetching the User data!", error);
      });
    setNewUser({ userName: '', phoneNumber: '', admin: false }); // Reset form
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/rajputFinance/api/user/deleteUser/${id}`)  // Ensure this is the correct API endpoint
      .then((response) => {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <div>
      <div className="bg-white rounded p-6 mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Add User</h2>
        <div className="mb-4">
          <input
            type="text"
            name="userName"
            value={newUser.userName}
            onChange={handleInputChange}
            placeholder="User Name"
            className="border border-gray-300 px-4 py-3 rounded mb-4 mr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="border border-gray-300 px-4 py-3 rounded mb-4 mr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          {/* isAdmin Checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="admin"
                checked={newUser.admin}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>

          <button
            onClick={handleAddUser}
            className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary focus:outline-none transition duration-300"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded p-6 mb-6 mobile-width">
        <h2 className="text-2xl font-semibold text-primary mb-4">Users List</h2>
        <div className="overflow-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-primary hover:text-white transition-all duration-300`}
                >
                  <td className="px-6 py-4">{user.userName}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.admin ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary focus:outline-none"
                    onClick={() => deleteUser(user.id)}
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

export default Users;
