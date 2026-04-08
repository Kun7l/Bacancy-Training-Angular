using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Event_Management_System.Repository.Model.Configuration
{
    public class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder) 
        {
            builder.HasKey(e => e.Id);
            builder.HasOne(e => e.Organizer).WithMany(o => o.OrganizedEvents).HasForeignKey(e => e.CreatedBy);

        }
    }
}
