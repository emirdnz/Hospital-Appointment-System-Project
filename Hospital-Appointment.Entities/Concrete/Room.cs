using Hospital_Appointment.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Room : BaseEntity
    {
      public string RoomNumber { get; set; }
        public string RoomType { get; set; } // ICU, General, Private
        public string Status { get; set; } // Available, Occupied, Under Maintenance

        public int HospitalId { get; set; }
        public virtual Hospital Hospital { get; set; }

        public string HospitalBlok { get; set; }

        public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
    }
}
