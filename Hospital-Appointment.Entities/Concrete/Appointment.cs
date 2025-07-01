using Hospital_Appointment.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Appointment : BaseEntity
    {
      IList<Patient> Patients { get; set; } = new List<Patient>();
        
        IList<Doctor> Doctors { get; set; } = new List<Doctor>();
     
        IList<Department> Departments { get; set; } = new List<Department>();
        
        public required DateTime AppointmentDate { get; set; }
        
        public string? Description { get; set; }

        public required string Status { get; set; } // e.g., Scheduled, Completed, Cancelled

        public required string Location { get; set; } // e.g., Hospital, Clinic, Online

        public required string AppointmentType { get; set; } // e.g., In-person, Telehealth


    }
}
