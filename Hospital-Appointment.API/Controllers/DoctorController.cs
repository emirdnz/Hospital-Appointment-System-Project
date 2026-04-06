using Hospital_Appointment.API.DTOs;
using Hospital_Appointment.DataAccess.Context;
using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorRepository _repository;
        private readonly AppDbContext _context;

        public DoctorController(IDoctorRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var doctors = await _repository.GetAllAsync();
            var result = doctors.Select(d => new
            {
                d.Id,
                d.DoctorName,
                d.DoctorSurname,
                d.Specialization,
                d.PhoneNumber,
                d.Email,
                d.DepartmentId,
                DepartmentName = d.Department?.Name ?? ""
            }).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var d = await _repository.GetByIdAsync(id);
            if (d == null) return NotFound();
            return Ok(new
            {
                d.Id,
                d.DoctorName,
                d.DoctorSurname,
                d.Specialization,
                d.PhoneNumber,
                d.Email,
                d.DepartmentId,
                DepartmentName = d.Department?.Name ?? ""
            });
        }

        [HttpPost]
        public async Task<IActionResult> Add(Doctor doctor)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(doctor.DoctorName) || string.IsNullOrWhiteSpace(doctor.DoctorSurname))
                return BadRequest("DoctorName and DoctorSurname are required.");
            if (string.IsNullOrWhiteSpace(doctor.Email) || string.IsNullOrWhiteSpace(doctor.PhoneNumber))
                return BadRequest("Email and PhoneNumber are required.");
            if (string.IsNullOrWhiteSpace(doctor.Specialization))
                return BadRequest("Specialization is required.");
            if (doctor.DepartmentId <= 0)
                return BadRequest("Valid DepartmentId is required.");

            await _repository.AddAsync(doctor);
            return Ok(doctor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Doctor dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.DoctorName) || string.IsNullOrWhiteSpace(dto.DoctorSurname))
                return BadRequest("DoctorName and DoctorSurname are required.");
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.PhoneNumber))
                return BadRequest("Email and PhoneNumber are required.");
            if (string.IsNullOrWhiteSpace(dto.Specialization))
                return BadRequest("Specialization is required.");
            if (dto.DepartmentId <= 0)
                return BadRequest("Valid DepartmentId is required.");

            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.DoctorName = dto.DoctorName;
            existing.DoctorSurname = dto.DoctorSurname;
            existing.Specialization = dto.Specialization;
            existing.PhoneNumber = dto.PhoneNumber;
            existing.Email = dto.Email;
            existing.DepartmentId = dto.DepartmentId;

            await _repository.UpdateAsync(existing);
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var appointmentCount = await _context.Appointments
                .CountAsync(a => a.DoctorId == id);

            if (appointmentCount > 0)
            {
                return BadRequest(new
                {
                    error = "HAS_APPOINTMENTS",
                    message = $"Bu doktorun {appointmentCount} aktif randevusu bulunmaktadır.",
                    detail = "Doktoru silmek için önce bu doktora ait tüm randevuları silmeniz gerekmektedir.",
                    action = "Lütfen önce Randevu Yönetimi sayfasından bu doktorun randevularını silin."
                });
            }

            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}