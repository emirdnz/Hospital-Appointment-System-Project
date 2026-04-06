import React, { useEffect, useState } from 'react';
import { appointmentService, doctorService, patientService, departmentService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    appointments: 0,
    doctors: 0,
    patients: 0,
    departments: 0,
  });

  useEffect(() => {
    Promise.all([
      appointmentService.getAll(),
      doctorService.getAll(),
      patientService.getAll(),
      departmentService.getAll(),
    ]).then(([a, d, p, dep]) => {
      setStats({
        appointments: a.data.length,
        doctors: d.data.length,
        patients: p.data.length,
        departments: dep.data.length,
      });
    });
  }, []);

  const cards = [
    { title: 'Randevular', value: stats.appointments, icon: '📅', path: '/admin/randevular', color: '#1a73e8' },
    { title: 'Doktorlar', value: stats.doctors, icon: '👨‍⚕️', path: '/admin/doktorlar', color: '#0d9e6e' },
    { title: 'Hastalar', value: stats.patients, icon: '🏥', path: '/admin/hastalar', color: '#e8a01a' },
    { title: 'Departmanlar', value: stats.departments, icon: '🏢', path: '/admin/departmanlar', color: '#e84c1a' },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '30px' }}>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {cards.map((card, i) => (
          <div key={i}
            onClick={() => navigate(card.path)}
            style={{
              background: card.color,
              color: 'white',
              padding: '30px',
              borderRadius: '12px',
              width: '200px',
              cursor: 'pointer',
              textAlign: 'center'
            }}>
            <div style={{ fontSize: '40px' }}>{card.icon}</div>
            <h3>{card.title}</h3>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;