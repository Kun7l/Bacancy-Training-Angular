using Event_Management_System.Repository.Data;
using Event_Management_System.Repository.Interface;
using Event_Management_System.Repository.Model;
using Microsoft.EntityFrameworkCore;

namespace Event_Management_System.Repository
{
    public class UserRepository(AppDbContext _context) : IUserRepository
    {
        public async Task<User?> Register(User user)
        {
            if (await _context.Users.AnyAsync(u => u.UserName == user.UserName)) {
                return null;
            }
            _context.Users.Add(user);
            await  _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> GetUserWithUserName(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u=>u.UserName == username);
        }

        public async Task DeleteUserWithUserName(string username)
        {
            var user = await _context.Users.FirstAsync(u=>u.UserName == username);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Event>> ViewRegisteredEvent(int userId)
        {
            var @event = await _context.EventAttendee.Include(ea => ea.Event).Where(ea => ea.AttendeeId == userId).Select(e=>e.Event).ToListAsync();

            return @event;

        }

        public async Task<bool> CancelRegistration(int userId,string eventName)
        {
            var @event = await _context.Events.FirstOrDefaultAsync(e=>e.Name == eventName);
            if (@event == null) return false;

            var registered = await _context.EventAttendee.FirstOrDefaultAsync(e => e.AttendeeId == userId && e.EventId == @event.Id);

            if (registered == null) return false;

            _context.EventAttendee.Remove(registered);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
