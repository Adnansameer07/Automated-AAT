import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Users from './pages/Users';
import Profile from './pages/Profile';
import { getToken } from './utils/auth';

function PrivateRoute({ children }){
  const token = getToken();
  return token ? children : <Navigate to='/login' />;
}

export default function App(){
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path='/records' element={<PrivateRoute><Records /></PrivateRoute>} />
      <Route path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}
