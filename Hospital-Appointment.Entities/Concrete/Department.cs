using Hospital_Appointment.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Department : BaseEntity
    {
       public string Name { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get; set; }

        public int HospitalId { get; set; }
        public virtual Hospital Hospital { get; set; }

        public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();



    }
}
