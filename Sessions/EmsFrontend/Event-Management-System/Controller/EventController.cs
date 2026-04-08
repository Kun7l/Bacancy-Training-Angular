using Event_Management_System.Repository.Model;
using Event_Management_System.Services.DTO;
using Event_Management_System.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;

namespace Event_Management_System.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController(IEventServices _services) : ControllerBase
    {
        [HttpPost("create")]
        [Authorize(Roles ="admin,organizer")]
        public async Task<ActionResult<Event>> CreateEvent(EventDTO request)
        {
            int userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var @event = await _services.CreateEvent(request,userId);
            if (@event == null)
            {

                return BadRequest("Already exits");
            }

            return Ok(@event);

        }

        [HttpPut("update")]
        [Authorize(Roles ="admin,organizer")]
        public async Task<ActionResult<Event>> UpdateEvent(EventUpdateDTO request)
        {
            string userName = User.FindFirstValue("username")!;

            var @event = await _services.UpdateEvent(request,userName);
            if(@event == null)
            {
                return BadRequest("Event doesnt exists or you are not authorized to update event");
            }
            return Ok(@event);
        }

        [HttpGet("viewall")]
        public async Task<ActionResult<List<Event>>> ViewAllEvents()
        {
            return await _services.ViewAllEvents();
        }

        [HttpGet("view{name}")]
        public async Task<ActionResult<EventDTO>> ViewEventByName(string name) { 
            var @event =  await _services.ViewEventByName(name);

            if (@event == null) return BadRequest("Event not found.");
            
            return Ok(@event);
        }

        [HttpPost("register-event")]
        [Authorize(Roles ="attendee")]
        public async Task<ActionResult<string>> RegisterAttendeEvent(string eventName)
        {

            int userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));
            bool registered = await _services.RegisterEvent(eventName,userId);

            if (!registered) {
                return BadRequest("Event not found or already registered.");
            }
            return Ok("successfully registered.");
        }
    }
}
