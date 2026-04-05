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
        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; }

        public int DoctorId { get; set; }
        public virtual Doctor Doctor { get; set; }

        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        public DateTime AppointmentDate { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public string AppointmentType { get; set; }
    }
}
