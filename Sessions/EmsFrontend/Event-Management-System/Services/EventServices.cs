using Event_Management_System.Repository.Interface;
using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;
using Event_Management_System.Services.Interface;
using Mapster;
using static Event_Management_System.Repository.Enums.Roles;

namespace Event_Management_System.Services
{
    public class EventServices(IEventRepository _repository,IUserRepository _userRepo) : IEventServices
    {
        public async Task<Event?> CreateEvent(EventDTO eventDetails,int userId)
        {
            // Check if an event with the same name already exists
            var existingEvent = await _repository.ViewEventByName(eventDetails.Name);
            if (existingEvent != null)
            {
                throw new InvalidOperationException($"Event with name '{eventDetails.Name}' already exists.");
            }

            Event newEvent = eventDetails.Adapt<Event>();
            newEvent.CreatedBy = userId;

            var @event = await _repository.CreateEvent(newEvent);

            if (@event == null)
            {
                return null;
            }

            return @event;
        }

        public async Task<Event?> UpdateEvent(EventUpdateDTO eventDetails, string userName)
        {
            var @event = await _repository.ViewEventByName(eventDetails.Name);
            var user = await _userRepo.GetUserWithUserName(userName);

            if (@event == null) {
                return null;
            }
            if (user.Role != UserRole.admin && user.Id != @event.CreatedBy ) {
                return null;
            }


            return await _repository.UpdateEvent(eventDetails);
        }

        public async Task<List<Event>> ViewAllEvents()
        {
            return await _repository.ViewAllEvents();
        }

        public async Task<EventDTO?> ViewEventByName(string name)
        {
            var @event = await _repository.ViewEventByName(name);
            if (@event == null)
            {
                return null;
            }
            return @event.Adapt<EventDTO>();
        }

        public async Task<bool> RegisterEvent(string eventName,int userId)
        {
           return await _repository.RegisterEvent(eventName, userId);
        }
    }
}
