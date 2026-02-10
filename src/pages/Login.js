import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

function validEmail(e) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    if (!validEmail(email)) { setMsg('Please enter a valid email address'); return; }
    if (password.length < 6) { setMsg('Password must be at least 6 characters'); return; }
    try {
      const res = await axios.post(API + '/api/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      nav('/');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="login-container">
      <div className="card login-card shadow-lg border-0">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Welcome Back</h2>
            <p className="text-muted">Sign in to your account</p>
          </div>
          {msg && <div className="alert alert-danger py-2">{msg}</div>}
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Email Address</label>
              <input className="form-control form-control-lg" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold">Password</label>
              <input className="form-control form-control-lg" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary w-100 btn-lg mb-3" type="submit">Sign In</button>
          </form>
          <div className="text-center text-muted small">
            Don't have an account? <a href="/register" className="text-primary text-decoration-none fw-bold">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}
