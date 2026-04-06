import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    { icon: '🏥', title: t('home.features.equipment.title'), desc: t('home.features.equipment.desc') },
    { icon: '👨‍⚕️', title: t('home.features.doctors.title'), desc: t('home.features.doctors.desc') },
    { icon: '📅', title: t('home.features.appointment.title'), desc: t('home.features.appointment.desc') },
    { icon: '🚑', title: t('home.features.emergency.title'), desc: t('home.features.emergency.desc') },
  ];

  const stats = [
    { value: '50+', label: t('home.stats.doctors') },
    { value: '20+', label: t('home.stats.departments') },
    { value: '10K+', label: t('home.stats.patients') },
    { value: '24/7', label: t('home.stats.service') },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">{t('home.title')}</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/randevu-al')}
              className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full text-lg hover:bg-blue-50 transition"
            >
              {t('home.appointmentBtn')}
            </button>
            <button
              onClick={() => navigate('/appointments')}
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-white hover:text-blue-700 transition"
            >
              {t('home.myAppointmentsBtn')}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-700 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-blue-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('home.whyUs')}</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('home.cta')}</h2>
        <p className="text-blue-100 mb-8">{t('home.ctaDesc')}</p>
        <button
          onClick={() => navigate('/randevu-al')}
          className="bg-white text-blue-700 font-bold px-10 py-3 rounded-full text-lg hover:bg-blue-50 transition"
        >
          {t('home.appointmentBtn')}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center">
        <p className="text-lg font-bold text-white mb-2">🏥 {t('home.title')}</p>
        <p className="text-sm">© 2026 {t('footer.rights')}</p>
      </footer>
    </div>
  );
};

export default Home;