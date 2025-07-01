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
        public required string RoomNumber { get; set; }

        public required string RoomType { get; set; } // e.g., "ICU", "General", "Private"

        public required string Status { get; set; } // e.g., "Available", "Occupied", "Under Maintenance"

        public required string HospitalId { get; set; } // Foreign key to Hospital

        public required string HospitalBlok { get; set; } // e.g., "A", "B", "C" 
    }
}
