import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import AppointmentList from './pages/AppointmentList';
import AppointmentCreate from './pages/AppointmentCreate';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '15px 40px', background: '#1a73e8', color: 'white', display: 'flex', alignItems: 'center', gap: '30px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>🏥 Deniz Hastanesi</span>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Ana Sayfa</Link>
          <Link to="/randevu-al" style={{ color: 'white', textDecoration: 'none' }}>Randevu Al</Link>
          <Link to="/appointments" style={{ color: 'white', textDecoration: 'none' }}>Randevularım</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/randevu-al" element={<AppointmentCreate />} />
          <Route path="/appointments" element={<AppointmentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;