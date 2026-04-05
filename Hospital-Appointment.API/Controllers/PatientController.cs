using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _repository;

        public PatientController(IPatientRepository repository)
        {
            _repository = repository;
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
            await _repository.AddAsync(patient);
            return Ok(patient);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Patient patient)
        {
            await _repository.UpdateAsync(patient);
            return Ok(patient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}