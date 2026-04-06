import axios from 'axios';

const API_BASE_URL = 'http://localhost:5137/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const appointmentService = {
  getAll: () => api.get('/Appointment'),
  getById: (id: number) => api.get(`/Appointment/${id}`),
  add: (data: any) => api.post('/Appointment', data),
  update: (id: number, data: any) => api.put(`/Appointment/${id}`, data),
  delete: (id: number) => api.delete(`/Appointment/${id}`),
};

export const hospitalService = {
  getAll: () => api.get('/Hospital'),
  getById: (id: number) => api.get(`/Hospital/${id}`),
  add: (data: any) => api.post('/Hospital', data),
  update: (id: number, data: any) => api.put(`/Hospital/${id}`, data),
  delete: (id: number) => api.delete(`/Hospital/${id}`),
};

export const doctorService = {
  getAll: () => api.get('/Doctor'),
  getById: (id: number) => api.get(`/Doctor/${id}`),
  add: (data: any) => api.post('/Doctor', data),
  update: (id: number, data: any) => api.put(`/Doctor/${id}`, data),
  delete: (id: number) => api.delete(`/Doctor/${id}`),
};

export const patientService = {
  getAll: () => api.get('/Patient'),
  getById: (id: number) => api.get(`/Patient/${id}`),
  add: (data: any) => api.post('/Patient', data),
  update: (id: number, data: any) => api.put(`/Patient/${id}`, data),
  delete: (id: number) => api.delete(`/Patient/${id}`),
};

export const departmentService = {
  getAll: () => api.get('/Department'),
  getById: (id: number) => api.get(`/Department/${id}`),
  add: (data: any) => api.post('/Department', data),
  update: (id: number, data: any) => api.put(`/Department/${id}`, data),
  delete: (id: number) => api.delete(`/Department/${id}`),
};