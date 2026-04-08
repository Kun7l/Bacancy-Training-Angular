using System.Text.Json.Serialization;

namespace Event_Management_System.Repository.Model
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateOnly StartDate { get; set; }
        public string Category { get; set; }
        public double TicketPrice { get; set; }


        // Foreign Key for Organizer
        public int CreatedBy { get; set; }

        [JsonIgnore]
        public virtual User Organizer { get; set; }

        // Use ONLY the join entity collection for attendees
        public virtual ICollection<EventAttendee> EventAttendees { get; set; }
    }
}