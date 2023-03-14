using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProiectPWeb.DTO;
using ProiectPWeb.EFCore;
using System.Reflection.Metadata;

namespace ProiectPWeb.Service
{
    public class ReservationService
    {
        private EF_DataContext _context;
        private readonly IConfiguration _configuration;
        public ReservationService(EF_DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public string AddReservation(AddReservationDTO reservation, string user_name)
        {
            DateTime dt = new DateTime(reservation.dateTime.Year,
                reservation.dateTime.Month,
                reservation.dateTime.Day, 0, 0, 0, 0, DateTimeKind.Utc);
            User user = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (user.hotelId == 1)
                return "You currently have no hotel profile created";
            Room room = _context.Rooms.Where(r => r.number.Equals(reservation.room_number) && r.hotelId.Equals(user.hotelId)).FirstOrDefault();
            if (room == null)
                return "THe room does not exits!";
            Reservation dbReservation = _context.Reservations.Where(r => r.dateTime.Equals(dt) && r.roomId.Equals(room.Id)).FirstOrDefault();
            if (dbReservation != null)
                return "There already is a reservation on that day!";
            dbReservation = new Reservation();
            dbReservation.dateTime = dt;
            dbReservation.room = room;
            _context.Reservations.Add(dbReservation);
            _context.SaveChanges();
            return "The reservation has been added!";
        }

        public String UpdateReservation(UpdateReservationDTO reservation, string user_name)
        {
            DateTime dt = new DateTime(reservation.dateTime.Year,
                reservation.dateTime.Month,
                reservation.dateTime.Day, 0, 0, 0, 0, DateTimeKind.Utc);
            User user = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (user.hotelId == 1)
                return "You currently have no hotel profile created";
            Reservation dbReservation = _context.Reservations.Where(r => r.Id.Equals(reservation.id)).FirstOrDefault();
            if (dbReservation == null)
                return "The reservation does not exist!";
            dbReservation.dateTime = dt;
            _context.Reservations.Update(dbReservation);
            _context.SaveChanges();
            return "The reservation has been updated!";
        }

        public string DeleteReservation(int id, string user_name)
        {
            User user = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (user.hotelId == 1)
                return "You currently have no hotel profile created";
            Reservation dbReservation = _context.Reservations.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (dbReservation == null)
                return "The reservation does not exist!";
            _context.Reservations.Remove(dbReservation);
            _context.SaveChanges();
            return "The reservation has been deleted!";
        }

        public List<GetReservationsResponseDTO> GetReservations(GetReservationsDTO reservations,string user_name)
        {
            DateTime sdt = new DateTime(reservations.startDate.Year,
                reservations.startDate.Month,
                reservations.startDate.Day, 0, 0, 0, 0, DateTimeKind.Utc);
            DateTime edt = new DateTime(reservations.endDate.Year,
                reservations.endDate.Month,
                reservations.endDate.Day, 0, 0, 0, 0, DateTimeKind.Utc);
            User user = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (user.hotelId == 1)
                return new List<GetReservationsResponseDTO>() { };
            List<GetReservationsResponseDTO> result = new List<GetReservationsResponseDTO>();
            List<Room> dbRooms = _context.Rooms
                .Include(room => room.reservations)
                .Where(room => room.hotelId == user.hotelId)
                .ToList();
            for (int i = 0; i < dbRooms.Count; i++)
            {
                foreach (Reservation reservation in dbRooms[i].reservations)
                {
                    if (reservation.dateTime.Ticks >= sdt.Ticks && reservation.dateTime.Ticks <= edt.Ticks)
                        result.Add(new GetReservationsResponseDTO(
                            dbRooms[i].number, reservation.dateTime, reservation.Id, dbRooms[i].number_of_persons));
                } 
            }
            return result;

        }
    }
}
