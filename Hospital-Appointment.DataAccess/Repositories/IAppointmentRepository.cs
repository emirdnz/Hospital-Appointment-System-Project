using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_Appointment.Entities.Concrete;


namespace Hospital_Appointment.DataAccess.Repositories
{
    public interface IAppointmentRepository
    {
        Task<List<Appointment>> GetAllAsync();
        Task<Appointment?> GetByIdAsync(int id);
        Task AddAsync(Appointment appointment);
        Task UpdateAsync(Appointment appointment);
        Task DeleteAsync(int id);
    }
}