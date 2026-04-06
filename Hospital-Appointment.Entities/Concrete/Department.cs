using Hospital_Appointment.Entities.Abstract;
using System.Text.Json.Serialization;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get; set; }

        public int HospitalId { get; set; }
        [JsonIgnore]
        public virtual Hospital? Hospital { get; set; }

        [JsonIgnore]
        public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
        [JsonIgnore]
        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}