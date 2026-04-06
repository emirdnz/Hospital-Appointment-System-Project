import React, { useEffect, useState } from 'react';
import { appointmentService } from '../services/api';
import { useTranslation } from 'react-i18next';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const getStatusText = (status: string) => {
    if (isEn) {
      switch (status) {
        case 'Scheduled': return '📅 Scheduled';
        case 'Completed': return '✅ Completed';
        case 'Cancelled': return '❌ Cancelled';
        default: return status;
      }
    } else {
      switch (status) {
        case 'Scheduled': return '📅 Planlandı';
        case 'Completed': return '✅ Tamamlandı';
        case 'Cancelled': return '❌ İptal Edildi';
        default: return status;
      }
    }
  };

  useEffect(() => {
    appointmentService.getAll()
      .then(res => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8 text-gray-500">{isEn ? 'Loading...' : 'Yükleniyor...'}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEn ? 'My Appointments' : 'Randevularım'}
      </h2>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">{isEn ? 'Patient' : 'Hasta'}</th>
              <th className="p-4 text-left">{isEn ? 'Doctor' : 'Doktor'}</th>
              <th className="p-4 text-left">{isEn ? 'Department' : 'Departman'}</th>
              <th className="p-4 text-left">{isEn ? 'Date' : 'Tarih'}</th>
              <th className="p-4 text-left">{isEn ? 'Status' : 'Durum'}</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={a.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 text-gray-600">{a.id}</td>
                <td className="p-4 font-medium text-gray-800">{a.patientFirstName} {a.patientLastName}</td>
                <td className="p-4 text-gray-600">{a.doctorName} {a.doctorSurname}</td>
                <td className="p-4 text-gray-600">{a.departmentName}</td>
                <td className="p-4 text-gray-600">{new Date(a.appointmentDate).toLocaleDateString(isEn ? 'en-US' : 'tr-TR')}</td>
                <td className="p-4">{getStatusText(a.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;