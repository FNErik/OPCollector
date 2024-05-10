import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing.tsx';
import Login from './pages/login/Login.tsx';
import SignUp from './pages/signup/SignUp.tsx';
import Dashboard from './pages/admin/dashboard/Dashboard.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
