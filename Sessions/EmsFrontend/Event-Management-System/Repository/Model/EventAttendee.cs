namespace Event_Management_System.Repository.Model
{
    public class EventAttendee
    {
        public int EventId { get; set; }
        public int AttendeeId { get; set; }

        public Event Event { get; set; }
        public User Attendee { get; set; }
    }
}
