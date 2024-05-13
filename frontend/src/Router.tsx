import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing.tsx';
import Login from './pages/login/Login.tsx';
import SignUp from './pages/signup/SignUp.tsx';
import Dashboard from './pages/admin/dashboard/Dashboard.tsx';
import Collections from './pages/collections/Collections.tsx';
import CollectionCards from './pages/collectionCards/CollectionCards.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:collectionName" element={<CollectionCards/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
