import React from 'react';
import { Link } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

export default function Layout({ children }) {
  const user = getUser();
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
      <nav className="sidebar p-3 d-flex flex-column" style={{ width: 260, flexShrink: 0 }}>
        <div className="mb-4 px-2">
          <h4 className="text-white fw-bold m-0">AAT System</h4>
          <small className="text-white-50">Professional Edition</small>
        </div>
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/records">Records</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
        </ul>
        <div className="mt-auto px-2 text-white-50 small">
          &copy; 2024 AAT Corp
        </div>
      </nav>
      <div className="flex-grow-1 d-flex flex-column">
        <header className="bg-white px-4 py-3 d-flex justify-content-between align-items-center shadow-sm" style={{ zIndex: 10 }}>
          <h5 className="m-0 text-secondary">Automated AAT Record System</h5>
          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <div className="fw-bold text-dark">{user?.name || 'User'}</div>
              <small className="text-muted">Administrator</small>
            </div>
            <button className="btn btn-outline-danger btn-sm px-3" onClick={logout}>Logout</button>
          </div>
        </header>
        <main className="p-4 flex-grow-1 overflow-auto">
          <div className="container-fluid" style={{ maxWidth: 1200 }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
