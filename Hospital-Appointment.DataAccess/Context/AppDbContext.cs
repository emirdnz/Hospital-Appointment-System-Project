using Hospital_Appointment.Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Appointment.DataAccess.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Room> Rooms { get; set; }

       protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Appointment>()
        .HasOne(a => a.Patient)
        .WithMany(p => p.Appointments)
        .HasForeignKey(a => a.PatientId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<Appointment>()
        .HasOne(a => a.Doctor)
        .WithMany(d => d.Appointments)
        .HasForeignKey(a => a.DoctorId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<Appointment>()
        .HasOne(a => a.Department)
        .WithMany(d => d.Appointments)
        .HasForeignKey(a => a.DepartmentId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<Doctor>()
        .HasOne(d => d.Department)
        .WithMany(dep => dep.Doctors)
        .HasForeignKey(d => d.DepartmentId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<Department>()
        .HasOne(d => d.Hospital)
        .WithMany(h => h.Departments)
        .HasForeignKey(d => d.HospitalId)
        .OnDelete(DeleteBehavior.NoAction);
}
    }
}