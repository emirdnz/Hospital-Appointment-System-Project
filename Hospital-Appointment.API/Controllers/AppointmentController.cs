using Hospital_Appointment.API.DTOs;
using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentRepository _repository;

        public AppointmentController(IAppointmentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var appointments = await _repository.GetAllAsync();
            var result = appointments.Select(a => new AppointmentDto
            {
                Id = a.Id,
                AppointmentDate = a.AppointmentDate,
                Description = a.Description,
                Status = a.Status,
                Location = a.Location,
                AppointmentType = a.AppointmentType,
                PatientId = a.PatientId,
                PatientFirstName = a.Patient?.FirstName ?? "",
                PatientLastName = a.Patient?.LastName ?? "",
                DoctorId = a.DoctorId,
                DoctorName = a.Doctor?.DoctorName ?? "",
                DoctorSurname = a.Doctor?.DoctorSurname ?? "",
                DepartmentId = a.DepartmentId,
                DepartmentName = a.Department?.Name ?? ""
            }).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var a = await _repository.GetByIdAsync(id);
            if (a == null) return NotFound();
            var result = new AppointmentDto
            {
                Id = a.Id,
                AppointmentDate = a.AppointmentDate,
                Description = a.Description,
                Status = a.Status,
                Location = a.Location,
                AppointmentType = a.AppointmentType,
                PatientId = a.PatientId,
                PatientFirstName = a.Patient?.FirstName ?? "",
                PatientLastName = a.Patient?.LastName ?? "",
                DoctorId = a.DoctorId,
                DoctorName = a.Doctor?.DoctorName ?? "",
                DoctorSurname = a.Doctor?.DoctorSurname ?? "",
                DepartmentId = a.DepartmentId,
                DepartmentName = a.Department?.Name ?? ""
            };
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(AppointmentCreateDto dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.Status) || string.IsNullOrWhiteSpace(dto.Location) || string.IsNullOrWhiteSpace(dto.AppointmentType))
                return BadRequest("Status, Location, and AppointmentType are required.");
            if (dto.PatientId <= 0 || dto.DoctorId <= 0 || dto.DepartmentId <= 0)
                return BadRequest("Valid PatientId, DoctorId, and DepartmentId are required.");
            if (dto.AppointmentDate == default)
                return BadRequest("AppointmentDate is required.");

            var appointment = new Appointment
            {
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                DepartmentId = dto.DepartmentId,
                AppointmentDate = dto.AppointmentDate,
                Description = dto.Description,
                Status = dto.Status,
                Location = dto.Location,
                AppointmentType = dto.AppointmentType
            };

            await _repository.AddAsync(appointment);
            return Ok(appointment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AppointmentCreateDto dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.Status) || string.IsNullOrWhiteSpace(dto.Location) || string.IsNullOrWhiteSpace(dto.AppointmentType))
                return BadRequest("Status, Location, and AppointmentType are required.");
            if (dto.PatientId <= 0 || dto.DoctorId <= 0 || dto.DepartmentId <= 0)
                return BadRequest("Valid PatientId, DoctorId, and DepartmentId are required.");

            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.Status = dto.Status;
            existing.AppointmentDate = dto.AppointmentDate;
            existing.Description = dto.Description;
            existing.Location = dto.Location;
            existing.AppointmentType = dto.AppointmentType;
            existing.PatientId = dto.PatientId;
            existing.DoctorId = dto.DoctorId;
            existing.DepartmentId = dto.DepartmentId;

            await _repository.UpdateAsync(existing);
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}