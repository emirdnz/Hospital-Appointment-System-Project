using Hospital_Appointment.Entities.Abstract;
using System.Text.Json.Serialization;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Hospital : BaseEntity
    {
        public string HospitalName { get; set; }
        public string HospitalBlok { get; set; }
        public string Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

        [JsonIgnore]
        public virtual ICollection<Department> Departments { get; set; } = new List<Department>();
        [JsonIgnore]
        public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
    }
}