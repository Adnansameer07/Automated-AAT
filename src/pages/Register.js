import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

function validEmail(e) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    if (!name.trim()) { setMsg('Name is required'); return; }
    if (!validEmail(email)) { setMsg('Please enter a valid email'); return; }
    if (password.length < 6) { setMsg('Password must be at least 6 characters'); return; }
    try {
      const res = await axios.post(API + '/api/auth/register', { name, email, password, role });
      setToken(res.data.token);
      setUser(res.data.user);
      nav('/');
    } catch (err) {
      if (err.response?.data?.errors) setMsg(err.response.data.errors.map(x => x.msg).join(', '));
      else setMsg(err.response?.data?.message || 'Register failed');
    }
  }

  return (
    <div className="login-container">
      <div className="card login-card shadow-lg border-0">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Create Account</h2>
            <p className="text-muted">Join the AAT Record System</p>
          </div>
          {msg && <div className="alert alert-danger py-2">{msg}</div>}
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Full Name</label>
              <input className="form-control form-control-lg" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Email Address</label>
              <input className="form-control form-control-lg" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Password</label>
              <input className="form-control form-control-lg" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold">Role</label>
              <select className="form-select form-select-lg" value={role} onChange={e => setRole(e.target.value)}>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </select>
            </div>
            <button className="btn btn-primary w-100 btn-lg mb-3" type="submit">Create Account</button>
          </form>
          <div className="text-center text-muted small">
            Already have an account? <a href="/login" className="text-primary text-decoration-none fw-bold">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}
