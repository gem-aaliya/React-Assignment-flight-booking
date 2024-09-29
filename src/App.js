import React from 'react';
import Login from './components/Login/Login.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;