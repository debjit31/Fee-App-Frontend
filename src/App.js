// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddFee from './pages/AddFee';
import FeeDetails from './pages/FeeDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FeeList from './components/FeeList';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-fee" element={<AddFee />} />
            <Route path="/fee-details/:id" element={<FeeDetails />} />
            <Route path="/" element={<FeeList />} />
            <Route path="/fees" element={<FeeList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
