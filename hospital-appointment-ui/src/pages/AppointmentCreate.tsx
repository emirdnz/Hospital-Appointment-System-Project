import React, { useEffect, useState } from 'react';
import { departmentService, doctorService, appointmentService, patientService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AppointmentCreate = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
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

    const patientRes = await patientService.add({
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phone,
      email: `${form.firstName.toLowerCase()}@temp.com`,
      dateOfBirth: '1990-01-01T00:00:00',
    });

    await appointmentService.add({
      patientId: patientRes.data.id,
      doctorId: parseInt(form.doctorId),
      departmentId: parseInt(form.departmentId),
      appointmentDate: form.appointmentDate,
      description: form.description,
      status: 'Scheduled',
      location: 'Hospital',
      appointmentType: 'In-person',
    });

    alert(isEn ? 'Your appointment has been created!' : 'Randevunuz oluşturuldu!');
    navigate('/appointments');
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        {isEn ? 'Book Appointment' : 'Randevu Al'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">{isEn ? 'First Name' : 'Ad'}</label>
          <input className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">{isEn ? 'Last Name' : 'Soyad'}</label>
          <input className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">{isEn ? 'Phone' : 'Telefon'}</label>
          <input className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">{isEn ? 'Department' : 'Departman'}</label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.departmentId} onChange={e => setForm({ ...form, departmentId: e.target.value })} required>
            <option value="">{isEn ? 'Select' : 'Seçiniz'}</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">{isEn ? 'Doctor' : 'Doktor'}</label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })} required>
            <option value="">{isEn ? 'Select' : 'Seçiniz'}</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.doctorName} {d.doctorSurname}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">{isEn ? 'Date & Time' : 'Tarih ve Saat'}</label>
          <input type="datetime-local" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.appointmentDate} onChange={e => setForm({ ...form, appointmentDate: e.target.value })} required />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">{isEn ? 'Description' : 'Açıklama'}</label>
          <textarea className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg">
          {isEn ? 'Create Appointment' : 'Randevu Oluştur'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentCreate;