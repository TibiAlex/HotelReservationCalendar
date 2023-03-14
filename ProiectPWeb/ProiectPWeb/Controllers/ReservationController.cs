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
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _db;
        public ReservationController(EF_DataContext eFDataContext, IConfiguration configuration)
        {
            _db = new ReservationService(eFDataContext, configuration);
        }

        // GET: api/<ReservationController>
        [HttpPost("getReservations"), Authorize]
        public IActionResult GetReservations(GetReservationsDTO reservation)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                List<GetReservationsResponseDTO> response = _db.GetReservations(reservation, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // POST add a new reservation api/<ReservationController>
        [HttpPost("addReservation"), Authorize]
        public IActionResult AddReservation([FromBody] AddReservationDTO reservation)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.AddReservation(reservation, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // PUT
        // update a reservation
        // api/<ReservationController>/5
        [HttpPut("updateReservation"), Authorize]
        public IActionResult UpdateReservation([FromBody] UpdateReservationDTO reservation)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.UpdateReservation(reservation, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }

        // DELETE
        // delete a reservation
        // api/<ReservationController>/5
        [HttpDelete("deleteReservation/{id}"), Authorize]
        public IActionResult DeleteReservation(int id)
        {
            ResponseType responseType = ResponseType.Success;
            try
            {
                string user_name = User.Identity.Name;
                string response = _db.DeleteReservation(id, user_name);
                return Ok(ResponseHandler.GetAppResponse(responseType, response));
            }
            catch (Exception exception)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(exception));
            }
        }
    }
}
