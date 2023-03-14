using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProiectPWeb.DTO;
using ProiectPWeb.EFCore;
using ProiectPWeb.Handlers;
using ProiectPWeb.Service;
using System.Security.Claims;
using System.Xml.Linq;
using static ProiectPWeb.Enums.UserRoles;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProiectPWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly HotelService _db;
        public HotelController(EF_DataContext eFDataContext, IConfiguration configuration)
        {
            _db = new HotelService(eFDataContext, configuration);
        }

        // GET: api/<HotelController>
        [HttpGet("getHotelNames"), Authorize]
        public IActionResult GetHotelNames()
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                List<string> response = _db.GetHotelNames(user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // GET: api/<HotelController>
        [HttpGet("getEmployees"), Authorize(Roles = "Owner")]
        public IActionResult GetEmployees()
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                List<GetEmployeesDTO> response = _db.GetPersonall(user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // POST
        // save the hotel data in the database
        // api/<HotelController>
        [HttpPost("register"), Authorize(Roles = "Owner")]
        public IActionResult SaveHotel([FromBody] SaveHotelDTO hotel)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.SaveHotel(hotel, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // POST
        // add a hotel to an employee
        // api/<HotelController>
        [HttpPost("addEmployee"), Authorize(Roles = "Personell")]
        public IActionResult AddEmployee([FromBody] string name)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.AddEmployee(name, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // PUT
        // modify the
        // name of the hotel api/<HotelController>/5
        [HttpPut("update"), Authorize(Roles = "Owner")]
        public IActionResult Put([FromBody] string name)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.UpdateHotel(name, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // DELETE
        // delte a hotel profile
        // api/<HotelController>/5
        [HttpDelete("delete/{name}"), Authorize(Roles = "Owner")]
        public IActionResult Delete(string name)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.DeleteHotel(name, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        [HttpGet("getHotel"), Authorize]
        public IActionResult GetHotel()
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                GetHotelInfoDTO getHotelInfoDTO = _db.GetHotel(user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, getHotelInfoDTO));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }
    }
}
