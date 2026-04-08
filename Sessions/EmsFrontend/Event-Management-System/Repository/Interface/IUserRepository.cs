using Event_Management_System.Repository.Model;

namespace Event_Management_System.Repository.Interface
{
    public interface IUserRepository
    {
        public Task<User?> Register(User user);
        public Task<User?> GetUserWithUserName(string username);

        public Task DeleteUserWithUserName(string username);

        public Task<List<Event>> ViewRegisteredEvent(int userId);

        public Task<bool> CancelRegistration(int userId,string eventName);
    }
}
