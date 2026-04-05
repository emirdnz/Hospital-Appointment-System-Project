using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorRepository _repository;

        public DoctorController(IDoctorRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var doctors = await _repository.GetAllAsync();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var doctor = await _repository.GetByIdAsync(id);
            if (doctor == null) return NotFound();
            return Ok(doctor);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Doctor doctor)
        {
            await _repository.AddAsync(doctor);
            return Ok(doctor);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Doctor doctor)
        {
            await _repository.UpdateAsync(doctor);
            return Ok(doctor);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}