import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Deniz Hastanesi</h1>
        <p style={{ fontSize: '20px', marginBottom: '40px' }}>
          Sağlığınız için en iyi hizmeti sunuyoruz.
        </p>
        <button
          onClick={() => navigate('/randevu-al')}
          style={{
            background: 'white',
            color: '#1a73e8',
            border: 'none',
            padding: '15px 40px',
            fontSize: '18px',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Randevu Al
        </button>
      </div>

      <div style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '40px' }}>Neden Bizi Seçmelisiniz?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { icon: '🏥', title: 'Modern Ekipman', desc: 'En son teknoloji ile donatılmış klinikler' },
            { icon: '👨‍⚕️', title: 'Uzman Doktorlar', desc: 'Alanında uzman deneyimli doktor kadrosu' },
            { icon: '📅', title: 'Kolay Randevu', desc: 'Online randevu sistemi ile zaman kaybetmeyin' },
          ].map((item, i) => (
            <div key={i} style={{
              background: '#f5f5f5',
              padding: '30px',
              borderRadius: '12px',
              width: '200px'
            }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;