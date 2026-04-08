namespace Event_Management_System.Services.DTO
{
    public class EventDTO
    {
        public string Name { get; set; }
        public DateOnly StartDate { get; set; }
        public string Category { get; set; }
        public double TicketPrice { get; set; }
    }
}
