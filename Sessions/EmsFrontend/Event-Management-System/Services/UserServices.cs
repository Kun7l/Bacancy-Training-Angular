using Event_Management_System.Repository.Enums;
using Event_Management_System.Repository.Interface;
using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;
using Event_Management_System.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Event_Management_System.Repository.Enums.Roles;

namespace Event_Management_System.Services
{
    public class UserServices(IUserRepository _repository, IConfiguration configuration) : IUserServices
    {
        public async Task<bool> DeleteUser(string UserName)
        {
            var user = await _repository.GetUserWithUserName(UserName);
            if (user == null) {
                return false;
            }

            await _repository.DeleteUserWithUserName(UserName);
            return true;
        }

        public async Task<string?> Login(UserRegisterDTO user)
        {
            User? currentUser = await _repository.GetUserWithUserName(user.UserName);
            if (currentUser == null)
            {
                return null;
            }

            if(new PasswordHasher<User>().VerifyHashedPassword(currentUser, currentUser.HashedPassword, user.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return CreateToken(currentUser);
        }

        public async Task<User?> RegisterUser(UserRegisterDTO user)
        {
            var alreadyExists = await _repository.GetUserWithUserName(user.UserName);
            if (alreadyExists != null) return null;

            User currentUser = new User();

            var hashedPassword = new PasswordHasher<User>().HashPassword(currentUser,user.Password);

            currentUser.UserName = user.UserName;
            currentUser.Role = UserRole.attendee;
            currentUser.HashedPassword = hashedPassword;

            return await _repository.Register(currentUser);

        }
        public async Task<User?> RegisterOrganizer(UserRegisterDTO user)
        {
            User currentUser = new User();

            var hashedPassword = new PasswordHasher<User>().HashPassword(currentUser, user.Password);

            currentUser.UserName = user.UserName;
            currentUser.Role = UserRole.organizer;
            currentUser.HashedPassword = hashedPassword;

            return await _repository.Register(currentUser);

        }

        public Task<bool> UpdateUser(string UserName)
        {
            throw new NotImplementedException();
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("username",user.UserName),
                new Claim(ClaimTypes.Role,Enum.GetName(typeof(UserRole),user.Role)!)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("Appsettings:Token")!)
                );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("Appsettings:Issuer"),
                audience: configuration.GetValue<string>("Appsettings:Audience"),
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        public Task<List<Event>> ViewRegisteredEvent(int userId)
        {
            return _repository.ViewRegisteredEvent(userId);
        }

        public async Task<bool> CancleRegistration(int userId, string eventName)
        {
            return await _repository.CancelRegistration(userId, eventName);
        }
    }
}
