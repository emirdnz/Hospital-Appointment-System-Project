import React, { useEffect, useState } from 'react';
import { departmentService, doctorService, appointmentService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AppointmentCreate = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    departmentId: '',
    doctorId: '',
    appointmentDate: '',
    description: '',
  });

  useEffect(() => {
    departmentService.getAll().then(res => setDepartments(res.data));
  }, []);

  useEffect(() => {
    if (form.departmentId) {
      doctorService.getAll().then(res => {
        const filtered = res.data.filter((d: any) => d.departmentId === parseInt(form.departmentId));
        setDoctors(filtered);
      });
    }
  }, [form.departmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await appointmentService.add({
      patientId: 1,
      doctorId: parseInt(form.doctorId),
      departmentId: parseInt(form.departmentId),
      appointmentDate: form.appointmentDate,
      description: form.description,
      status: 'Scheduled',
      location: 'Hospital',
      appointmentType: 'In-person',
    });
    alert('Randevunuz oluşturuldu!');
    navigate('/appointments');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', background: '#f9f9f9', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '30px', color: '#1a73e8' }}>Randevu Al</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Ad</label>
          <input style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Soyad</label>
          <input style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Telefon</label>
          <input style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Departman</label>
          <select style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={form.departmentId} onChange={e => setForm({ ...form, departmentId: e.target.value })} required>
            <option value="">Seçiniz</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Doktor</label>
          <select style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })} required>
            <option value="">Seçiniz</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.doctorName} {d.doctorSurname}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Tarih ve Saat</label>
          <input type="datetime-local" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={form.appointmentDate} onChange={e => setForm({ ...form, appointmentDate: e.target.value })} required />
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label>Açıklama</label>
          <textarea style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '15px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
          Randevu Oluştur
        </button>
      </form>
    </div>
  );
};

export default AppointmentCreate;