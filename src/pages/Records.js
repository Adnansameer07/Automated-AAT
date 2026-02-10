import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { getToken, getUser } from '../utils/auth';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

export default function Records() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ studentName: '', studentId: '', assessmentTitle: '', score: '', maxScore: '', remarks: '' });
  const user = getUser();
  const isStudent = user?.role === 'student';

  useEffect(() => { fetchRecords(); }, []);

  async function fetchRecords() {
    const res = await axios.get(API + '/api/records', { headers: { Authorization: 'Bearer ' + getToken() } });
    setRecords(res.data);
  }

  async function add(e) {
    e.preventDefault();
    await axios.post(API + '/api/records', form, { headers: { Authorization: 'Bearer ' + getToken() } });
    setForm({ studentName: '', studentId: '', assessmentTitle: '', score: '', maxScore: '', remarks: '' });
    fetchRecords();
  }

  async function remove(id) {
    if (!window.confirm('Delete?')) return;
    await axios.delete(API + '/api/records/' + id, { headers: { Authorization: 'Bearer ' + getToken() } });
    fetchRecords();
  }

  return (
    <Layout>
      <div className="mb-4">
        <h3 className="fw-bold text-dark">Records Management</h3>
        <p className="text-muted">Add and manage student assessment records</p>
      </div>

      {!isStudent && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0 fw-bold text-primary">Add New Record</h5>
          </div>
          <div className="card-body p-4">
            <form onSubmit={add} className="row g-3">
              <div className="col-md-4">
                <label className="form-label small fw-bold text-secondary">Student Name</label>
                <input className="form-control" placeholder="e.g. Jane Doe" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-bold text-secondary">Student ID</label>
                <input className="form-control" placeholder="e.g. 1001" value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-secondary">Assessment Title</label>
                <input className="form-control" placeholder="e.g. Midterm Exam" value={form.assessmentTitle} onChange={e => setForm({ ...form, assessmentTitle: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-bold text-secondary">Score</label>
                <input className="form-control" type="number" placeholder="0" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-bold text-secondary">Max Score</label>
                <input className="form-control" type="number" placeholder="100" value={form.maxScore} onChange={e => setForm({ ...form, maxScore: e.target.value })} />
              </div>
              <div className="col-md-8">
                <label className="form-label small fw-bold text-secondary">Remarks</label>
                <input className="form-control" placeholder="Optional comments" value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} />
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-primary px-4">
                  <span className="me-2">+</span> Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-secondary">All Records</h5>
          <span className="badge bg-light text-dark border">{records.length} records</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4 py-3 text-secondary small text-uppercase">Student</th>
                  <th className="py-3 text-secondary small text-uppercase">ID</th>
                  <th className="py-3 text-secondary small text-uppercase">Assessment</th>
                  <th className="py-3 text-secondary small text-uppercase">Score</th>
                  <th className="py-3 text-secondary small text-uppercase">Max</th>
                  <th className="py-3 text-secondary small text-uppercase">Submitted By</th>
                  {!isStudent && <th className="pe-4 py-3 text-end text-secondary small text-uppercase">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={isStudent ? 6 : 7} className="text-center py-5 text-muted">
                      No records found. Add one above.
                    </td>
                  </tr>
                ) : records.map(r => (
                  <tr key={r._id}>
                    <td className="ps-4 fw-bold text-dark">{r.studentName}</td>
                    <td className="text-muted">{r.studentId}</td>
                    <td><span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25">{r.assessmentTitle}</span></td>
                    <td className="fw-bold">{r.score}</td>
                    <td className="text-muted">{r.maxScore}</td>
                    <td className="small text-muted">{r.submittedBy?.name}</td>
                    {!isStudent && (
                      <td className="pe-4 text-end">
                        <button className="btn btn-sm btn-outline-danger border-0" onClick={() => remove(r._id)} title="Delete Record">
                          🗑️
                        </button>
                      </td>
                    )}
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
