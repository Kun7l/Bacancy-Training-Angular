using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;

namespace Event_Management_System.Services.Interface
{
    public interface IEventServices 
    {
        public Task<Event?> CreateEvent(EventDTO eventDetails,int userId);

        public Task<Event?> UpdateEvent(EventUpdateDTO eventDetails,string userName);

        public Task<List<Event>> ViewAllEvents();

        public Task<EventDTO?> ViewEventByName(string eventName);

        public Task<bool> RegisterEvent(string eventName,int userId);


    }
}
