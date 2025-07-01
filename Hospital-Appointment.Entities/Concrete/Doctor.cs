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
        public required string DoctorName { get; set; }

        public required string Surname { get; set; }

        public required string Specialization /*(uzmanlik alani) */ { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; }

        IList<Room>? Rooms { get; set; } = new List<Room>();

    }
}
