using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalRepository _repository;

        public HospitalController(IHospitalRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hospitals = await _repository.GetAllAsync();
            return Ok(hospitals);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var hospital = await _repository.GetByIdAsync(id);
            if (hospital == null) return NotFound();
            return Ok(hospital);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Hospital hospital)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(hospital.HospitalName) || string.IsNullOrWhiteSpace(hospital.HospitalBlok))
                return BadRequest("HospitalName and HospitalBlok are required.");
            if (string.IsNullOrWhiteSpace(hospital.Email) || string.IsNullOrWhiteSpace(hospital.PhoneNumber))
                return BadRequest("Email and PhoneNumber are required.");
            if (string.IsNullOrWhiteSpace(hospital.Address))
                return BadRequest("Address is required.");

            await _repository.AddAsync(hospital);
            return Ok(hospital);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Hospital dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.HospitalName) || string.IsNullOrWhiteSpace(dto.HospitalBlok))
                return BadRequest("HospitalName and HospitalBlok are required.");
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.PhoneNumber))
                return BadRequest("Email and PhoneNumber are required.");
            if (string.IsNullOrWhiteSpace(dto.Address))
                return BadRequest("Address is required.");

            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.HospitalName = dto.HospitalName;
            existing.HospitalBlok = dto.HospitalBlok;
            existing.Address = dto.Address;
            existing.PhoneNumber = dto.PhoneNumber;
            existing.Email = dto.Email;

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