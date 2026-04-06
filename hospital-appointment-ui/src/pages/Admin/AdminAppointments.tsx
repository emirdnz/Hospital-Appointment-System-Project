import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../../services/api';

const getStatusText = (status: string) => {
  switch (status) {
    case 'Scheduled': return '📅 Planlandı';
    case 'Completed': return '✅ Tamamlandı';
    case 'Cancelled': return '❌ İptal Edildi';
    default: return status;
  }
};

const ConfirmModal = ({ message, onConfirm, onCancel }: { message: string, onConfirm: () => void, onCancel: () => void }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
      <span style={{ fontSize: '40px' }}>🗑️</span>
      <h3 style={{ margin: '12px 0 8px', color: '#374151' }}>Emin misiniz?</h3>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>{message}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onCancel} style={{ flex: 1, padding: '10px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#374151' }}>İptal</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: '10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Evet, Sil</button>
      </div>
    </div>
  </div>
);

const Toast = ({ message }: { message: string }) => (
  <div style={{ position: 'fixed', top: '30px', left: '50%', transform: 'translateX(-50%)', background: '#0d9e6e', color: 'white', padding: '14px 24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', zIndex: 2000, fontWeight: 'bold', fontSize: '15px' }}>
    ✅ {message}
  </div>
);

const backBtn = { background: '#0d9e6e', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' as const };
const thStyle = { padding: '12px', textAlign: 'left' as const, borderBottom: '2px solid #1558b0' };
const tdStyle = { padding: '10px 12px', borderBottom: '1px solid #e5e7eb', verticalAlign: 'middle' as const };

const AdminAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    appointmentService.getAll().then(res => setAppointments(res.data));
  }, []);

  const handleDelete = async () => {
    if (confirmId === null) return;
    await appointmentService.delete(confirmId);
    setAppointments(appointments.filter(a => a.id !== confirmId));
    setConfirmId(null);
    showToast('Randevu başarıyla silindi.');
  };

  const handleEdit = (a: any) => {
    setEditId(a.id);
    setEditStatus(a.status);
  };

  const handleUpdate = async (a: any) => {
    await appointmentService.update(a.id, {
      patientId: a.patientId,
      doctorId: a.doctorId,
      departmentId: a.departmentId,
      appointmentDate: a.appointmentDate,
      description: a.description,
      status: editStatus,
      location: a.location,
      appointmentType: a.appointmentType,
    });
    setAppointments(appointments.map(ap => ap.id === a.id ? { ...ap, status: editStatus } : ap));
    setEditId(null);
    showToast('Randevu durumu güncellendi.');
  };

  return (
    <div style={{ padding: '40px' }}>
      {confirmId !== null && <ConfirmModal message="Bu randevu kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />}
      {toast && <Toast message={toast} />}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => navigate('/admin')} style={backBtn}>← Geri Dön</button>
        <h2 style={{ margin: 0 }}>Randevu Yönetimi</h2>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#1a73e8', color: 'white' }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Hasta</th>
              <th style={thStyle}>Doktor</th>
              <th style={thStyle}>Departman</th>
              <th style={thStyle}>Tarih</th>
              <th style={thStyle}>Durum</th>
              <th style={thStyle}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={a.id} style={{ background: i % 2 === 0 ? '#f9fafb' : 'white' }}>
                <td style={tdStyle}>{a.id}</td>
                <td style={tdStyle}>{a.patientFirstName} {a.patientLastName}</td>
                <td style={tdStyle}>{a.doctorName} {a.doctorSurname}</td>
                <td style={tdStyle}>{a.departmentName}</td>
                <td style={tdStyle}>{new Date(a.appointmentDate).toLocaleDateString('tr-TR')}</td>
                <td style={tdStyle}>
                  {editId === a.id ? (
                    <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                      <option value="Scheduled">📅 Planlandı</option>
                      <option value="Completed">✅ Tamamlandı</option>
                      <option value="Cancelled">❌ İptal Edildi</option>
                    </select>
                  ) : getStatusText(a.status)}
                </td>
                <td style={{ ...tdStyle, display: 'flex', gap: '5px' }}>
                  {editId === a.id ? (
                    <>
                      <button onClick={() => handleUpdate(a)} style={{ background: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Kaydet</button>
                      <button onClick={() => setEditId(null)} style={{ background: 'gray', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>İptal</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(a)} style={{ background: '#1a73e8', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Düzenle</button>
                      <button onClick={() => setConfirmId(a.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Sil</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;