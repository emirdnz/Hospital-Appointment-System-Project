namespace Hospital_Appointment.API.DTOs
{
    public class AppointmentCreateDto
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public string AppointmentType { get; set; }
    }
}