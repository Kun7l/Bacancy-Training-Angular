using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using static Event_Management_System.Repository.Enums.Roles;

namespace Event_Management_System.Repository.Model.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder) {

            builder.HasKey(u => u.Id);
            builder.Property(u=>u.UserName).IsRequired();
            builder.Property(u => u.Role).IsRequired();

            var user = new User();
            
            //hashed password for 1234
            builder.HasData(new User { Id = 1, UserName = "admin", HashedPassword = "AQAAAAIAAYagAAAAEK6ws6xwnKbwolapQzJBABb/Dll9RdR1jglRwOh4GeAxP8a0YTuCwCFX1p2ofHJEng==", Role = UserRole.admin });
        }
    }
}

