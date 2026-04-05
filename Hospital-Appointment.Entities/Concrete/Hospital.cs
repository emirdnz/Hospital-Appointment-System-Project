using Hospital_Appointment.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Hospital : BaseEntity
    {
       public string HospitalName { get; set; }
        public string HospitalBlok { get; set; }
        public string Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

        public virtual ICollection<Department> Departments { get; set; } = new List<Department>();
        public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
    }
 
}
