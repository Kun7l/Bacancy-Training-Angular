
using System.Text.Json.Serialization;
using static Event_Management_System.Repository.Enums.Roles;

namespace Event_Management_System.Repository.Model
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string HashedPassword { get; set; }
        public UserRole Role { get; set; }

        // Events this user organized (One-to-Many)
        [JsonIgnore]
        public virtual ICollection<Event> OrganizedEvents { get; set; } 

        // Events this user is attending (Many-to-Many via Join Entity)
        public virtual ICollection<EventAttendee> EventAttendees { get; set; }
    }
}
