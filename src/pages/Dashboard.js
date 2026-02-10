import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

export default function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => { fetchRecords(); }, []);

  async function fetchRecords() {
    try {
      const res = await axios.get(API + '/api/records', { headers: { Authorization: 'Bearer ' + getToken() } });
      setRecords(res.data);
    } catch (err) { console.error(err); }
  }

  const summary = records.reduce((acc, r) => {
    acc.total = (acc.total || 0) + 1;
    acc.sumScore = (acc.sumScore || 0) + (r.score || 0);
    return acc;
  }, {});

  const chartData = [
    { name: 'Records', value: summary.total || 0 },
    { name: 'Avg Score', value: summary.total ? Math.round((summary.sumScore || 0) / summary.total) : 0 }
  ];

  return (
    <Layout>
      <div className="mb-4">
        <h3 className="fw-bold text-dark">Dashboard</h3>
        <p className="text-muted">Overview of your record system</p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card stat-card p-4 h-100">
            <div>
              <h6 className="text-muted text-uppercase fw-bold small mb-2">Total Records</h6>
              <h2 className="fw-bold text-dark mb-0">{summary.total || 0}</h2>
            </div>
            <div className="stat-icon">
              📊
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card p-4 h-100">
            <h5 className="fw-bold mb-4">Analytics Overview</h5>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="var(--primary-color)" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
