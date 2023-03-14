using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProiectPWeb.DTO;
using ProiectPWeb.EFCore;
using ProiectPWeb.Handlers;
using ProiectPWeb.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProiectPWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomService _db;
        public RoomController(EF_DataContext eFDataContext, IConfiguration configuration)
        {
            _db = new RoomService(eFDataContext, configuration);
        }

        // GET: api/<RoomController>
        [HttpGet("getAllRooms"), Authorize]
        public IActionResult GetAllRooms()
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                List<GetAllRoomsDTO> response = _db.GetAllRooms(user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // POST
        // adding a new room
        // api/<RoomController>
        [HttpPost("addNewRoom"), Authorize(Roles = "Owner")]
        public IActionResult AddNewRoom([FromBody] AddNewRoomDTO room)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.AddNewRoom(room, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // PUT
        // modify a room
        // api/<RoomController>/5
        [HttpPut("modifyRoom"), Authorize(Roles = "Owner")]
        public IActionResult ModifyRoom([FromBody] ModifyRoomDTO room)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.ModifyRoom(room, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // DELETE
        // delete a room api/<RoomController>/5
        [HttpDelete("deleteRoom/{number}"), Authorize(Roles = "Owner")]
        public IActionResult DeleteRoom(int number)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.DeleteRoom(number, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }
    }
}
