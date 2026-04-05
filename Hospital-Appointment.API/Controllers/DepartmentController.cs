using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _repository;

        public DepartmentController(IDepartmentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departments = await _repository.GetAllAsync();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var department = await _repository.GetByIdAsync(id);
            if (department == null) return NotFound();
            return Ok(department);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Department department)
        {
            await _repository.AddAsync(department);
            return Ok(department);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Department department)
        {
            await _repository.UpdateAsync(department);
            return Ok(department);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}