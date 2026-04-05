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
            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _repository.GetByIdAsync(id);
            if (appointment == null) return NotFound();
            return Ok(appointment);
        }

        [HttpPost]
        public async Task<IActionResult> Add(AppointmentCreateDto dto)
        {
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

        [HttpPut]
        public async Task<IActionResult> Update(Appointment appointment)
        {
            await _repository.UpdateAsync(appointment);
            return Ok(appointment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}