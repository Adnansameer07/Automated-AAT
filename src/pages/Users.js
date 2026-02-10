import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { getToken } from '../utils/auth';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    const res = await axios.get(API + '/api/users', { headers: { Authorization: 'Bearer ' + getToken() } });
    setUsers(res.data);
  }

  async function remove(id) {
    if (!window.confirm('Delete user?')) return;
    await axios.delete(API + '/api/users/' + id, { headers: { Authorization: 'Bearer ' + getToken() } });
    fetchUsers();
  }

  return (
    <Layout>
      <div className="mb-4">
        <h3 className="fw-bold text-dark">User Management</h3>
        <p className="text-muted">Manage system users and their roles</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-secondary">Registered Users</h5>
          <span className="badge bg-light text-dark border">{users.length} users</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4 py-3 text-secondary small text-uppercase">Name</th>
                  <th className="py-3 text-secondary small text-uppercase">Email</th>
                  <th className="py-3 text-secondary small text-uppercase">Role</th>
                  <th className="pe-4 py-3 text-end text-secondary small text-uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      No users found.
                    </td>
                  </tr>
                ) : users.map(u => (
                  <tr key={u._id}>
                    <td className="ps-4 fw-bold text-dark">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 32, height: 32, fontSize: 14 }}>
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        {u.name}
                      </div>
                    </td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'bg-danger' : u.role === 'teacher' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${u.role === 'admin' ? 'danger' : u.role === 'teacher' ? 'success' : 'secondary'} border border-${u.role === 'admin' ? 'danger' : u.role === 'teacher' ? 'success' : 'secondary'} border-opacity-25 text-capitalize`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="pe-4 text-end">
                      <button className="btn btn-sm btn-outline-danger border-0" onClick={() => remove(u._id)} title="Delete User">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
