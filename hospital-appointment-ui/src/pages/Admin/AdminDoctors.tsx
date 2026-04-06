import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorService, departmentService } from '../../services/api';

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

const ErrorModal = ({ error, onClose }: { error: any, onClose: () => void }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '480px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '32px' }}>⚠️</span>
        <h3 style={{ margin: 0, color: '#dc2626', fontSize: '18px' }}>Silme İşlemi Başarısız</h3>
      </div>
      <p style={{ margin: '0 0 8px', fontWeight: 'bold', color: '#374151' }}>{error?.message}</p>
      <p style={{ margin: '0 0 16px', color: '#6b7280', fontSize: '14px' }}>{error?.detail}</p>
      <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px', marginBottom: '20px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#92400e' }}><strong>Ne yapmalısınız?</strong><br />{error?.action}</p>
      </div>
      <button onClick={onClose} style={{ width: '100%', background: '#1a73e8', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>Anladım</button>
    </div>
  </div>
);

const Toast = ({ message }: { message: string }) => (
 <div style={{ position: 'fixed', top: '30px', left: '50%', transform: 'translateX(-50%)', background: '#0d9e6e', color: 'white', padding: '14px 24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', zIndex: 2000, fontWeight: 'bold', fontSize: '15px' }}>
    ✅ {message}
  </div>
);

const AdminDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ doctorName: '', doctorSurname: '', specialization: '', phoneNumber: '', departmentId: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ doctorName: '', doctorSurname: '', specialization: '', phoneNumber: '', departmentId: '' });
  const [errorModal, setErrorModal] = useState<any>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    doctorService.getAll().then(res => setDoctors(res.data));
    departmentService.getAll().then(res => setDepartments(res.data));
  }, []);

  const handleDelete = async () => {
    if (confirmId === null) return;
    try {
      await doctorService.delete(confirmId);
      setDoctors(doctors.filter(d => d.id !== confirmId));
      showToast('Doktor başarıyla silindi.');
    } catch (err: any) {
      setErrorModal(err?.response?.data);
    }
    setConfirmId(null);
  };

  const handleEdit = (d: any) => {
    setEditId(d.id);
    setEditForm({ doctorName: d.doctorName, doctorSurname: d.doctorSurname, specialization: d.specialization, phoneNumber: d.phoneNumber || '', departmentId: d.departmentId });
  };

  const handleUpdate = async (d: any) => {
    await doctorService.update(d.id, { ...d, ...editForm, departmentId: parseInt(editForm.departmentId) });
    setDoctors(doctors.map(doc => doc.id === d.id ? { ...doc, ...editForm } : doc));
    setEditId(null);
    showToast('Doktor bilgileri güncellendi.');
  };

  const handleAdd = async () => {
    const res = await doctorService.add({ ...addForm, departmentId: parseInt(addForm.departmentId) });
    setDoctors([...doctors, res.data]);
    setShowAdd(false);
    setAddForm({ doctorName: '', doctorSurname: '', specialization: '', phoneNumber: '', departmentId: '' });
    showToast('Yeni doktor eklendi.');
  };

  const inputStyle = { padding: '5px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' };
  const thStyle = { padding: '12px', textAlign: 'left' as const, borderBottom: '2px solid #059669' };
  const tdStyle = { padding: '10px 12px', borderBottom: '1px solid #e5e7eb', verticalAlign: 'middle' as const };

  return (
    <div style={{ padding: '40px' }}>
      {confirmId !== null && <ConfirmModal message="Bu doktor kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />}
      {errorModal && <ErrorModal error={errorModal} onClose={() => setErrorModal(null)} />}
      {toast && <Toast message={toast} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/admin')} style={{ background: '#0d9e6e', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>← Geri Dön</button>
          <h2 style={{ margin: 0 }}>Doktor Yönetimi</h2>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: '#0d9e6e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>+ Doktor Ekle</button>
      </div>

      {showAdd && (
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input style={inputStyle} placeholder="Ad" value={addForm.doctorName} onChange={e => setAddForm({ ...addForm, doctorName: e.target.value })} />
          <input style={inputStyle} placeholder="Soyad" value={addForm.doctorSurname} onChange={e => setAddForm({ ...addForm, doctorSurname: e.target.value })} />
          <input style={inputStyle} placeholder="Uzmanlık" value={addForm.specialization} onChange={e => setAddForm({ ...addForm, specialization: e.target.value })} />
          <input style={inputStyle} placeholder="Telefon" value={addForm.phoneNumber} onChange={e => setAddForm({ ...addForm, phoneNumber: e.target.value })} />
          <select style={inputStyle} value={addForm.departmentId} onChange={e => setAddForm({ ...addForm, departmentId: e.target.value })}>
            <option value="">Departman Seçin</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button onClick={handleAdd} style={{ background: 'green', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Kaydet</button>
          <button onClick={() => setShowAdd(false)} style={{ background: 'gray', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>İptal</button>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#0d9e6e', color: 'white' }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Ad Soyad</th>
              <th style={thStyle}>Uzmanlık</th>
              <th style={thStyle}>Departman</th>
              <th style={thStyle}>Telefon</th>
              <th style={thStyle}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d, i) => (
              <tr key={d.id} style={{ background: i % 2 === 0 ? '#f9fafb' : 'white' }}>
                <td style={tdStyle}>{d.id}</td>
                <td style={tdStyle}>{editId === d.id ? <><input style={inputStyle} value={editForm.doctorName} onChange={e => setEditForm({ ...editForm, doctorName: e.target.value })} /><input style={inputStyle} value={editForm.doctorSurname} onChange={e => setEditForm({ ...editForm, doctorSurname: e.target.value })} /></> : `${d.doctorName} ${d.doctorSurname}`}</td>
                <td style={tdStyle}>{editId === d.id ? <input style={inputStyle} value={editForm.specialization} onChange={e => setEditForm({ ...editForm, specialization: e.target.value })} /> : d.specialization}</td>
                <td style={tdStyle}>{editId === d.id ? <select style={inputStyle} value={editForm.departmentId} onChange={e => setEditForm({ ...editForm, departmentId: e.target.value })}>{departments.map(dep => <option key={dep.id} value={dep.id}>{dep.name}</option>)}</select> : d.departmentName}</td>
                <td style={tdStyle}>{editId === d.id ? <input style={inputStyle} value={editForm.phoneNumber} onChange={e => setEditForm({ ...editForm, phoneNumber: e.target.value })} /> : d.phoneNumber}</td>
                <td style={{ ...tdStyle, display: 'flex', gap: '5px' }}>
                  {editId === d.id ? (
                    <>
                      <button onClick={() => handleUpdate(d)} style={{ background: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Kaydet</button>
                      <button onClick={() => setEditId(null)} style={{ background: 'gray', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>İptal</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(d)} style={{ background: '#1a73e8', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Düzenle</button>
                      <button onClick={() => setConfirmId(d.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Sil</button>
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

export default AdminDoctors;