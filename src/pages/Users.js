import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSuspend = async (id) => {
    try {
      await axios.post(`/api/admin/suspend/${id}`);
      setUsers(users.map(user => user.id === id ? { ...user, isSuspended: true } : user));
    } catch (error) {
      console.error('Error suspending user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/delete/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="users">
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email})
            {!user.isSuspended && (
              <>
                <button onClick={() => handleSuspend(user.id)}>Suspend</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
