import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import AppointmentList from './pages/AppointmentList';
import AppointmentCreate from './pages/AppointmentCreate';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminAppointments from './pages/Admin/AdminAppointments';
import AdminDoctors from './pages/Admin/AdminDoctors';
import AdminPatients from './pages/Admin/AdminPatients';
import AdminDepartments from './pages/Admin/AdminDepartments';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-700 font-bold text-xl no-underline">
          🏥 <span>{t('home.title')}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium transition hover:text-blue-600 no-underline ${location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
            {t('nav.home')}
          </Link>
          <Link to="/randevu-al" className={`text-sm font-medium transition hover:text-blue-600 no-underline ${location.pathname === '/randevu-al' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
            {t('nav.appointment')}
          </Link>
          <Link to="/appointments" className={`text-sm font-medium transition hover:text-blue-600 no-underline ${location.pathname === '/appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
            {t('nav.myAppointments')}
          </Link>
          <button
            onClick={toggleLang}
            className="text-sm font-medium text-gray-600 border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
          >
            {i18n.language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
          </button>
          <Link to="/admin" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition no-underline">
            {t('nav.admin')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          <Link to="/" className="text-gray-700 font-medium no-underline" onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link>
          <Link to="/randevu-al" className="text-gray-700 font-medium no-underline" onClick={() => setMenuOpen(false)}>{t('nav.appointment')}</Link>
          <Link to="/appointments" className="text-gray-700 font-medium no-underline" onClick={() => setMenuOpen(false)}>{t('nav.myAppointments')}</Link>
          <button onClick={toggleLang} className="text-left text-gray-700 font-medium">
            {i18n.language === 'tr' ? '🇬🇧 English' : '🇹🇷 Türkçe'}
          </button>
          <Link to="/admin" className="text-blue-600 font-medium no-underline" onClick={() => setMenuOpen(false)}>{t('nav.admin')}</Link>
        </div>
      )}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/randevu-al" element={<AppointmentCreate />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/randevular" element={<AdminAppointments />} />
          <Route path="/admin/doktorlar" element={<AdminDoctors />} />
          <Route path="/admin/hastalar" element={<AdminPatients />} />
          <Route path="/admin/departmanlar" element={<AdminDepartments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;