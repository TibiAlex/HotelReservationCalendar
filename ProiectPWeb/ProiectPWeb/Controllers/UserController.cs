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
    public class UserController : ControllerBase
    {
        private readonly UserService _db;
        public UserController(EF_DataContext eFDataContext, IConfiguration configuration)
        {
            _db = new UserService(eFDataContext, configuration);
        }

        // POST api
        // for registering the users
        // /<UserController>
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterUserDTO user)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string response = _db.SaveUser(user);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // POST api
        // for login
        // /<UserController>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUserDTO user)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string token = _db.LoginUser(user);
                return Ok(ResponseHandler.GetAppResponse(responseType, token));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        [HttpGet("getRole"), Authorize]
        public IActionResult GetRole()
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string role = _db.GetRole(user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, role));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }
    }
}
