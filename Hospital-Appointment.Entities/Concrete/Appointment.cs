using Hospital_Appointment.Entities.Abstract;
using System.Text.Json.Serialization;

namespace Hospital_Appointment.Entities.Concrete
{
    public class Appointment : BaseEntity
    {
        public int PatientId { get; set; }
        [JsonIgnore]
        public virtual Patient? Patient { get; set; }

        public int DoctorId { get; set; }
        [JsonIgnore]
        public virtual Doctor? Doctor { get; set; }

        public int DepartmentId { get; set; }
        [JsonIgnore]
        public virtual Department? Department { get; set; }

        public DateTime AppointmentDate { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string AppointmentType { get; set; } = string.Empty;
    }
}