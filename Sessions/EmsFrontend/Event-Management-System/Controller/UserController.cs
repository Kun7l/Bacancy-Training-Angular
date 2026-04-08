using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;
using Event_Management_System.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Event_Management_System.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserServices _services) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(UserRegisterDTO request) {
            var user = await _services.RegisterUser(request);

            if (user == null)
            {
                return BadRequest("User already exits.");
            }

            return Ok(user);
        }

        [HttpPost("register-organizer")]
        [Authorize(Roles =("admin"))]
        public async Task<ActionResult<User>> RegisterOrganizer(UserRegisterDTO request)
        {
            var user = await _services.RegisterOrganizer(request);

            if (user == null)
            {
                return BadRequest("User already exits.");
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> LoginUser(UserRegisterDTO request)
        {
            var token = await _services.Login(request);

            if (token == null)
            {
                return BadRequest("Invalid username or password.");
            }

            return Ok(new {token = token});
        }

        [HttpDelete("delete-user")]
        public async Task<ActionResult<string>> DeleteUser(string userName) { 
            bool response = await _services.DeleteUser(userName);
            if (!response) {
                return BadRequest("User does not exits");
            }

            return Ok("Succefully deleted.");
        }

        [HttpGet("view-registered-events")]
        [Authorize(Roles =("attendee"))]

        public async Task<ActionResult<List<Event>>> ViewRegisteredEvent()
        {
            int userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));

            return await _services.ViewRegisteredEvent(userId);
        }

        [HttpPost("cencle-registration")]
        [Authorize(Roles =("attendee"))]
        public async Task<ActionResult<string>> CancelRegistration(string eventName)
        {
            int userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var cancled = await _services.CancleRegistration(userId, eventName);
            if (!cancled) return BadRequest("Not found");
            return Ok("Succesfully canceled");
        }
    }
}
