import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      nav: {
        home: 'Ana Sayfa',
        appointment: 'Randevu Al',
        myAppointments: 'Randevularım',
        admin: 'Admin Panel',
      },
      home: {
        title: 'Deniz Hastanesi',
        subtitle: 'Sağlığınız bizim önceliğimiz. Modern tıp teknolojisi ve uzman kadromuzla yanınızdayız.',
        appointmentBtn: 'Randevu Al',
        myAppointmentsBtn: 'Randevularım',
        whyUs: 'Neden Bizi Seçmelisiniz?',
        cta: 'Hemen Randevu Alın',
        ctaDesc: 'Uzman doktorlarımızla görüşmek için randevu alın.',
        stats: {
          doctors: 'Uzman Doktor',
          departments: 'Departman',
          patients: 'Mutlu Hasta',
          service: 'Hizmet',
        },
        features: {
          equipment: { title: 'Modern Ekipman', desc: 'En son teknoloji ile donatılmış klinikler ve ameliyathaneler' },
          doctors: { title: 'Uzman Doktorlar', desc: 'Alanında uzman, deneyimli doktor ve sağlık personeli kadrosu' },
          appointment: { title: 'Kolay Randevu', desc: 'Online randevu sistemi ile 7/24 randevu alabilirsiniz' },
          emergency: { title: 'Acil Servis', desc: '24 saat kesintisiz acil servis hizmeti' },
        }
      },
      footer: {
        rights: 'Tüm hakları saklıdır.',
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        appointment: 'Book Appointment',
        myAppointments: 'My Appointments',
        admin: 'Admin Panel',
      },
      home: {
        title: 'Deniz Hospital',
        subtitle: 'Your health is our priority. We are with you with modern medical technology and expert staff.',
        appointmentBtn: 'Book Appointment',
        myAppointmentsBtn: 'My Appointments',
        whyUs: 'Why Choose Us?',
        cta: 'Book an Appointment Now',
        ctaDesc: 'Book an appointment to see our expert doctors.',
        stats: {
          doctors: 'Expert Doctors',
          departments: 'Departments',
          patients: 'Happy Patients',
          service: 'Service',
        },
        features: {
          equipment: { title: 'Modern Equipment', desc: 'Clinics and operating rooms equipped with the latest technology' },
          doctors: { title: 'Expert Doctors', desc: 'Experienced doctors and healthcare staff in their fields' },
          appointment: { title: 'Easy Appointment', desc: 'Book appointments 24/7 with our online system' },
          emergency: { title: 'Emergency Service', desc: '24/7 uninterrupted emergency service' },
        }
      },
      footer: {
        rights: 'All rights reserved.',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;