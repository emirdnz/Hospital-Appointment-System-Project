import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { departmentService, hospitalService } from '../../services/api';

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

const AdminDepartments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', hospitalId: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', description: '', hospitalId: '' });
  const [errorModal, setErrorModal] = useState<any>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    departmentService.getAll().then(res => setDepartments(res.data));
    hospitalService.getAll().then(res => setHospitals(res.data));
  }, []);

  const handleDelete = async () => {
    if (confirmId === null) return;
    try {
      await departmentService.delete(confirmId);
      setDepartments(departments.filter(d => d.id !== confirmId));
      showToast('Departman başarıyla silindi.');
    } catch (err: any) {
      setErrorModal(err?.response?.data);
    }
    setConfirmId(null);
  };

  const handleEdit = (d: any) => {
    setEditId(d.id);
    setEditForm({ name: d.name, description: d.description, hospitalId: d.hospitalId });
  };

  const handleUpdate = async (d: any) => {
    await departmentService.update(d.id, { ...d, ...editForm, hospitalId: parseInt(editForm.hospitalId) });
    setDepartments(departments.map(dep => dep.id === d.id ? { ...dep, ...editForm } : dep));
    setEditId(null);
    showToast('Departman bilgileri güncellendi.');
  };

  const handleAdd = async () => {
    const res = await departmentService.add({ ...addForm, hospitalId: parseInt(addForm.hospitalId) });
    setDepartments([...departments, res.data]);
    setShowAdd(false);
    setAddForm({ name: '', description: '', hospitalId: '' });
    showToast('Yeni departman eklendi.');
  };

  const inputStyle = { padding: '5px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' };
  const thStyle = { padding: '12px', textAlign: 'left' as const, borderBottom: '2px solid #c0392b' };
  const tdStyle = { padding: '10px 12px', borderBottom: '1px solid #e5e7eb', verticalAlign: 'middle' as const };

  return (
    <div style={{ padding: '40px' }}>
      {confirmId !== null && <ConfirmModal message="Bu departman kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />}
      {errorModal && <ErrorModal error={errorModal} onClose={() => setErrorModal(null)} />}
      {toast && <Toast message={toast} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/admin')} style={{ background: '#0d9e6e', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>← Geri Dön</button>
          <h2 style={{ margin: 0 }}>Departman Yönetimi</h2>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: '#e84c1a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>+ Departman Ekle</button>
      </div>

      {showAdd && (
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input style={inputStyle} placeholder="Departman Adı" value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })} />
          <input style={inputStyle} placeholder="Açıklama" value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} />
          <select style={inputStyle} value={addForm.hospitalId} onChange={e => setAddForm({ ...addForm, hospitalId: e.target.value })}>
            <option value="">Hastane Seçin</option>
            {hospitals.map(h => <option key={h.id} value={h.id}>{h.hospitalName}</option>)}
          </select>
          <button onClick={handleAdd} style={{ background: 'green', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Kaydet</button>
          <button onClick={() => setShowAdd(false)} style={{ background: 'gray', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>İptal</button>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#e84c1a', color: 'white' }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Ad</th>
              <th style={thStyle}>Açıklama</th>
              <th style={thStyle}>Hastane</th>
              <th style={thStyle}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d, i) => (
              <tr key={d.id} style={{ background: i % 2 === 0 ? '#f9fafb' : 'white' }}>
                <td style={tdStyle}>{d.id}</td>
                <td style={tdStyle}>{editId === d.id ? <input style={inputStyle} value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /> : d.name}</td>
                <td style={tdStyle}>{editId === d.id ? <input style={inputStyle} value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} /> : d.description}</td>
                <td style={tdStyle}>{editId === d.id ? <select style={inputStyle} value={editForm.hospitalId} onChange={e => setEditForm({ ...editForm, hospitalId: e.target.value })}>{hospitals.map(h => <option key={h.id} value={h.id}>{h.hospitalName}</option>)}</select> : d.hospitalName}</td>
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

export default AdminDepartments;