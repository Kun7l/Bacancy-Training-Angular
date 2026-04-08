using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;

namespace Event_Management_System.Services.Interface
{
    public interface IUserServices
    {
        public Task<User?> RegisterUser(UserRegisterDTO user);
        public Task<User?> RegisterOrganizer(UserRegisterDTO user);
        public Task<string?> Login(UserRegisterDTO user);

        public Task<bool> DeleteUser(string UserName);

        public Task<bool> UpdateUser(string UserName);

        public Task<List<Event>> ViewRegisteredEvent(int userId);

        public Task<bool> CancleRegistration(int userId, string eventName);

    }
}
