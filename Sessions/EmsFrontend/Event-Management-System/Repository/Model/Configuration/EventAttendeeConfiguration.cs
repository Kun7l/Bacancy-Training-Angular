using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Event_Management_System.Repository.Model.Configuration
{
    public class EventAttendeeConfiguration : IEntityTypeConfiguration<EventAttendee>
    {
        public void Configure(EntityTypeBuilder<EventAttendee> builder) {

            builder.HasKey(ea => new { ea.EventId, ea.AttendeeId });

            builder.HasOne(ea => ea.Attendee).WithMany(a => a.EventAttendees).HasForeignKey(ea => ea.AttendeeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(ea=>ea.Event).WithMany(e=>e.EventAttendees).HasForeignKey(ea=>ea.EventId);
        }
    }
}
