import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home.tsx';
import Login from './pages/login/Login.tsx';
import Register from './pages/register/Register.tsx';

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
