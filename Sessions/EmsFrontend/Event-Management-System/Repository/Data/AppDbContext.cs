using Event_Management_System.Repository.Model;
using Event_Management_System.Repository.Model.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Event_Management_System.Repository.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }

        public DbSet<EventAttendee> EventAttendee { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EventConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new EventAttendeeConfiguration());
        }
    }
}
