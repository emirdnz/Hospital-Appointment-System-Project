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
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? ImageUrl { get; set; }
        public required bool IsActive { get; set; } = true;
        public required DateTime CreatedDate { get; set; } = DateTime.Now;
        public required DateTime UpdatedDate { get; set; } = DateTime.Now;
        
        // Navigation properties
        public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
        public virtual ICollection<Hospital> Hospitals { get; set; } = new List<Hospital>();



    }
}
