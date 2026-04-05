using Hospital_Appointment.Entities.Concrete;

namespace Hospital_Appointment.DataAccess.Repositories
{
    public interface IHospitalRepository
    {
        Task<List<Hospital>> GetAllAsync();
        Task<Hospital?> GetByIdAsync(int id);
        Task AddAsync(Hospital hospital);
        Task UpdateAsync(Hospital hospital);
        Task DeleteAsync(int id);
    }
}