import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  const handleUserUpdated = () => {
    fetchUsers();
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {editingUser ? (
        <UpdateUserForm user={editingUser} onUserUpdated={handleUserUpdated} />
      ) : (
        <AddUserForm onUserAdded={handleUserAdded} />
      )}
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user._id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-lg">{user.name}</div>
                <div className="text-gray-700">{user.email}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="mt-2 space-y-1">
              {user.borrowingHistory.map(loan => (
                <li key={loan._id} className="text-gray-600">
                  Borrowed <span className="font-medium">{loan.book.title}</span> on {new Date(loan.loanDate).toLocaleDateString()} due on {new Date(loan.dueDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
