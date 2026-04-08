using Event_Management_System.Repository.Data;
using Event_Management_System.Repository.Interface;
using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Event_Management_System.Repository
{
    public class EventRepository(AppDbContext _context) : IEventRepository
    {
        public async Task<Event?> CreateEvent(Event eventDetails)
        {
            var currentEvent = await _context.Events.AnyAsync(e=>e.Name == eventDetails.Name);

            if (currentEvent) {
                return null;
            }
            
            _context.Events.Add(eventDetails);
            await _context.SaveChangesAsync();
            return eventDetails;
        }

        public Task<bool> DeleteEvent(Event eventDetails)
        {
            throw new NotImplementedException();
        }

        public async Task<Event?> UpdateEvent(EventUpdateDTO eventDetails)
        {
            var @event = await _context.Events.FirstOrDefaultAsync(e=>e.Name == eventDetails.Name);
            if (@event == null)
            {
                return null;
            }

            @event.Name = eventDetails.NewName;
            @event.TicketPrice = eventDetails.TicketPrice;
            @event.StartDate = eventDetails.StartDate;
            @event.Category = eventDetails.Category;

            _context.Events.Update(@event);
            await _context.SaveChangesAsync();
            return @event;
        }

        public async Task<List<Event>> ViewAllEvents()
        {
           return await _context.Events.ToListAsync();
        }

        public async Task<Event?> ViewEventByName(string eventName)
        {
            var @event = await _context.Events.FirstOrDefaultAsync(e=>e.Name == eventName);
            if (@event == null) {
                return null;
            }
            return @event;
        }

        public async Task<bool> RegisterEvent(string eventName, int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            var @event = await _context.Events.FirstOrDefaultAsync(e => e.Name == eventName);

            if (user == null || @event == null) return false;

            // prevent duplicate registrations
            var alreadyRegistered = await _context.EventAttendee
                .AnyAsync(ea => ea.EventId == @event.Id && ea.AttendeeId == userId);

            if (alreadyRegistered) return false;

            var attendee = new EventAttendee
            {
                EventId = @event.Id,
                AttendeeId = userId
            };

            _context.EventAttendee.Add(attendee);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
