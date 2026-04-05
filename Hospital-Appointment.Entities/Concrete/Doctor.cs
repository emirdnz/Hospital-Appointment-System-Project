using Hospital_Appointment.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Doctor : BaseEntity
    {
       public string DoctorName { get; set; }
        public string DoctorSurname { get; set; }
        public string Specialization { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();

    }
}
