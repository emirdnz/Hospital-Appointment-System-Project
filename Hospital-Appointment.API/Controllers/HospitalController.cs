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
            await _repository.AddAsync(hospital);
            return Ok(hospital);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Hospital hospital)
        {
            await _repository.UpdateAsync(hospital);
            return Ok(hospital);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}