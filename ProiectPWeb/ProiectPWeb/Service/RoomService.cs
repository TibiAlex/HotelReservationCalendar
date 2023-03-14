using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using ProiectPWeb.DTO;
using ProiectPWeb.EFCore;
using System.Xml.Linq;

namespace ProiectPWeb.Service
{
    public class RoomService
    {
        private EF_DataContext _context;
        private readonly IConfiguration _configuration;
        public RoomService(EF_DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public string AddNewRoom(AddNewRoomDTO room, string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return "There is no hotel profile created!";

            Room dbRoom = _context.Rooms.Where(r => r.number.Equals(room.number) && r.hotelId.Equals(owner.hotelId)).FirstOrDefault();
            if (dbRoom != null)
                return "The room number already exists!";
            dbRoom = new Room();
            dbRoom.number = room.number;
            dbRoom.number_of_persons = room.number_of_persons;
            Hotel hotel = _context.Hotels.Where(h => h.Id.Equals(owner.hotelId)).FirstOrDefault();
            dbRoom.hotel = hotel;
            _context.Rooms.Add(dbRoom);
            _context.SaveChanges();
            return "The room has been added!";
        }

        public string ModifyRoom(ModifyRoomDTO room, string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return "There is no hotel profile created!";
            Room dbRoom = _context.Rooms.Where(r => r.number.Equals(room.new_number) && r.hotelId.Equals(owner.hotelId)).FirstOrDefault();
            if (dbRoom != null)
                return "The new_number already exists!";
            dbRoom = _context.Rooms.Where(r => r.number.Equals(room.old_number) && r.hotelId.Equals(owner.hotelId)).FirstOrDefault();
            if (dbRoom == null)
                return "The room number does not exist!";
            dbRoom.number = room.new_number;
            _context.Rooms.Update(dbRoom);
            _context.SaveChanges();
            return "The room has been updated!";
        }

        public string DeleteRoom(int number, string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return "There is no hotel profile created!";
            Room dbRoom = _context.Rooms.Where(r => r.number.Equals(number) && r.hotelId.Equals(owner.hotelId)).FirstOrDefault();
            if (dbRoom == null)
                return "The room number does not exist!";
            _context.Rooms.Remove(dbRoom);
            _context.SaveChanges();
            return "The room has been deleted!";
        }

        public List<GetAllRoomsDTO> GetAllRooms(string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return new List<GetAllRoomsDTO>() { };
            List<GetAllRoomsDTO> result = new List<GetAllRoomsDTO>();
            List<Room> rooms = _context.Rooms
                                  .Where(r => r.hotelId == owner.hotelId)
                                  .ToList();
            for (int i = 0; i < rooms.Count; i++)
            {
                result.Add(new GetAllRoomsDTO(rooms[i].number, rooms[i].number_of_persons));
            }
            return result;
        }
    }
}
