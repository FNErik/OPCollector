import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//import Home from './pages/home/Home.tsx';
import Login from './pages/login/Login.tsx';
import SignUp from './pages/signup/SignUp.tsx';
import Dashboard from './pages/admin/dashboard/Dashboard.tsx';

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
