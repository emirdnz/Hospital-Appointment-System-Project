import React, { useEffect, useState } from 'react';
import { appointmentService } from '../services/api';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Randevular</h2>
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hasta</th>
            <th>Doktor</th>
            <th>Departman</th>
            <th>Tarih</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.patient?.firstName} {a.patient?.lastName}</td>
              <td>{a.doctor?.doctorName} {a.doctor?.doctorSurname}</td>
              <td>{a.department?.name}</td>
              <td>{new Date(a.appointmentDate).toLocaleDateString('tr-TR')}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;