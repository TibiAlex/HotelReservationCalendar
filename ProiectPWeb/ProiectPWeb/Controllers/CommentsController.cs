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
    public class CommentsController : ControllerBase
    {
        private readonly CommentService _db;
        public CommentsController(EF_DataContext eFDataContext, IConfiguration configuration)
        {
            _db = new CommentService(eFDataContext, configuration);
        }

        // GET: api/<CommentsController>
        [HttpGet("getAllComments"), Authorize]
        public IActionResult GetAllComments()
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                List<string> response = _db.GetAllComments(user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // POST api/<CommentsController>
        [HttpPost("addComment"), Authorize(Roles ="Owner")]
        public IActionResult AddComment([FromBody] AddCommentDTO comment)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.AddComment(comment, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // PUT api/<CommentsController>/5
        [HttpPut("updateMessage"), Authorize(Roles = "Owner")]
        public IActionResult UpdateMessage([FromBody] UpdateCommentDTO comment)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.UpdateComment(comment, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("deleteComment/{id}"), Authorize(Roles = "Owner")]
        public IActionResult Delete(int id)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.DeleteComment(id, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }
    }
}
