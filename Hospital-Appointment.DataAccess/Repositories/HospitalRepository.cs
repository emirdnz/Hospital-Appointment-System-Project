using Hospital_Appointment.DataAccess.Context;
using Hospital_Appointment.Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Appointment.DataAccess.Repositories
{
    public class HospitalRepository : IHospitalRepository
    {
        private readonly AppDbContext _context;

        public HospitalRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Hospital>> GetAllAsync()
        {
            return await _context.Hospitals.ToListAsync();
        }

        public async Task<Hospital?> GetByIdAsync(int id)
        {
            return await _context.Hospitals
                .FirstOrDefaultAsync(h => h.Id == id);
        }

        public async Task AddAsync(Hospital hospital)
        {
            await _context.Hospitals.AddAsync(hospital);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Hospital hospital)
        {
            _context.Hospitals.Update(hospital);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var hospital = await _context.Hospitals
                .FirstOrDefaultAsync(h => h.Id == id);
            if (hospital != null)
            {
                _context.Hospitals.Remove(hospital);
                await _context.SaveChangesAsync();
            }
        }
    }
}