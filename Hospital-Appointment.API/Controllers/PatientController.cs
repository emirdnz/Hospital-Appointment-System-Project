using Hospital_Appointment.DataAccess.Context;
using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _repository;
        private readonly AppDbContext _context;

        public PatientController(IPatientRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var patients = await _repository.GetAllAsync();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var patient = await _repository.GetByIdAsync(id);
            if (patient == null) return NotFound();
            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Patient patient)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(patient.FirstName) || string.IsNullOrWhiteSpace(patient.LastName))
                return BadRequest("FirstName and LastName are required.");
            if (string.IsNullOrWhiteSpace(patient.Email) || string.IsNullOrWhiteSpace(patient.PhoneNumber))
                return BadRequest("Email and PhoneNumber are required.");
            if (patient.DateOfBirth == default)
                return BadRequest("DateOfBirth is required.");

            await _repository.AddAsync(patient);
            return Ok(patient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Patient dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.FirstName) || string.IsNullOrWhiteSpace(dto.LastName))
                return BadRequest("FirstName and LastName are required.");
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.PhoneNumber))
                return BadRequest("Email and PhoneNumber are required.");

            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.FirstName = dto.FirstName;
            existing.LastName = dto.LastName;
            existing.Email = dto.Email;
            existing.PhoneNumber = dto.PhoneNumber;
            existing.Address = dto.Address;
            if (dto.DateOfBirth != default)
                existing.DateOfBirth = dto.DateOfBirth;

            await _repository.UpdateAsync(existing);
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var appointmentCount = await _context.Appointments
                .CountAsync(a => a.PatientId == id);

            if (appointmentCount > 0)
            {
                return BadRequest(new
                {
                    error = "HAS_APPOINTMENTS",
                    message = $"Bu hastanın {appointmentCount} aktif randevusu bulunmaktadır.",
                    detail = "Hastayı silmek için önce bu hastaya ait tüm randevuları silmeniz gerekmektedir.",
                    action = "Lütfen önce Randevu Yönetimi sayfasından bu hastanın randevularını silin."
                });
            }

            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}