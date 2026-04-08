using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;

namespace Event_Management_System.Repository.Interface
{
    public interface IEventRepository
    {
        public Task<Event?> CreateEvent(Event eventDetails);
        public Task<Event?> UpdateEvent(EventUpdateDTO eventDetails);

        public Task<bool> DeleteEvent(Event eventDetails);

        public Task<List<Event>> ViewAllEvents();

        public Task<Event?> ViewEventByName(string eventName);

        public Task<bool> RegisterEvent(string eventName, int userId);
    }
}
