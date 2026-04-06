using Hospital_Appointment.DataAccess.Context;
using Hospital_Appointment.DataAccess.Repositories;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Appointment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _repository;
        private readonly AppDbContext _context;

        public DepartmentController(IDepartmentRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departments = await _repository.GetAllAsync();
            var result = departments.Select(d => new
            {
                d.Id,
                d.Name,
                d.Description,
                d.ImageUrl,
                d.HospitalId,
                HospitalName = d.Hospital?.HospitalName ?? ""
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
                d.Name,
                d.Description,
                d.ImageUrl,
                d.HospitalId,
                HospitalName = d.Hospital?.HospitalName ?? ""
            });
        }

        [HttpPost]
        public async Task<IActionResult> Add(Department department)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(department.Name))
                return BadRequest("Department Name is required.");
            if (department.HospitalId <= 0)
                return BadRequest("Valid HospitalId is required.");

            await _repository.AddAsync(department);
            return Ok(department);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Department dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Department Name is required.");
            if (dto.HospitalId <= 0)
                return BadRequest("Valid HospitalId is required.");

            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.Name = dto.Name;
            existing.Description = dto.Description;
            existing.HospitalId = dto.HospitalId;
            existing.ImageUrl = dto.ImageUrl;

            await _repository.UpdateAsync(existing);
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var doctorCount = await _context.Doctors
                .CountAsync(d => d.DepartmentId == id);

            var appointmentCount = await _context.Appointments
                .CountAsync(a => a.DepartmentId == id);

            if (doctorCount > 0 || appointmentCount > 0)
            {
                return BadRequest(new
                {
                    error = "HAS_RELATIONS",
                    message = $"Bu departmanın {doctorCount} doktoru ve {appointmentCount} randevusu bulunmaktadır.",
                    detail = "Departmanı silmek için önce ilişkili kayıtları silmeniz gerekmektedir.",
                    action = "Lütfen önce bu departmana ait doktorları ve randevuları silin."
                });
            }

            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}