import React from 'react';
import Layout from '../components/Layout';
import { getUser } from '../utils/auth';

export default function Profile() {
  const u = getUser();
  return (
    <Layout>
      <div className="mb-4">
        <h3 className="fw-bold text-dark">My Profile</h3>
        <p className="text-muted">Manage your account settings</p>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm text-center p-5">
            <div className="mb-4">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: 100, height: 100, fontSize: 40 }}>
                {u?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <h4 className="fw-bold mb-1">{u?.name}</h4>
            <p className="text-muted mb-3">{u?.email}</p>
            <div>
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill text-uppercase">
                {u?.role}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold text-secondary">Account Details</h5>
            </div>
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="small text-muted fw-bold text-uppercase mb-1">Full Name</label>
                  <div className="fw-medium fs-5">{u?.name}</div>
                </div>
                <div className="col-md-6">
                  <label className="small text-muted fw-bold text-uppercase mb-1">Email Address</label>
                  <div className="fw-medium fs-5">{u?.email}</div>
                </div>
                <div className="col-md-6">
                  <label className="small text-muted fw-bold text-uppercase mb-1">Role</label>
                  <div className="fw-medium fs-5 text-capitalize">{u?.role}</div>
                </div>
                <div className="col-md-6">
                  <label className="small text-muted fw-bold text-uppercase mb-1">Account Status</label>
                  <div className="fw-medium fs-5 text-success">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
