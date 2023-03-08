using Microsoft.IdentityModel.Tokens;
using ProiectPWeb.DTO;
using ProiectPWeb.EFCore;

namespace ProiectPWeb.Service
{
    public class HotelService
    {
        private EF_DataContext _context;
        private readonly IConfiguration _configuration;
        public HotelService(EF_DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public string SaveHotel(SaveHotelDTO hotel, string user_name)
        {
            if (hotel.Name.IsNullOrEmpty() ||
                hotel.number_of_free_spaces < 0 ||
                hotel.number_of_spaces < 0 ||
                hotel.number_of_rooms < 0)
            {
                return "Empty fields!";
            }
            Hotel dbTable = _context.Hotels.Where(u => u.Name.Equals(hotel.Name)).FirstOrDefault();
            if (dbTable != null)
            {
                return "A hotel with the same name already exists!";
            }
            else
            {
                User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
                if (owner.hotelId == 1) 
                {
                    dbTable = new Hotel();
                    dbTable.Name = hotel.Name;
                    dbTable.number_of_rooms = hotel.number_of_rooms;
                    dbTable.number_of_spaces = hotel.number_of_spaces;
                    dbTable.number_of_free_spaces = hotel.number_of_free_spaces;
                    _context.Hotels.Add(dbTable);
                    _context.Users.Remove(owner);
                    _context.SaveChanges();
                    owner.hotel = dbTable;
                    owner.hotelId = dbTable.Id;
                    _context.Users.Add(owner);
                    _context.SaveChanges();
                    return "The hotel profile has been created!";
                }
                else
                {
                    return "User already has a hotel!";
                }
            }
        }

        public string DeleteHotel(string name, string user_name)
        {
            if (name.IsNullOrEmpty()) 
                return "Empty field!";
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return "There is no hotel to delete!";
            Hotel dbHotel = _context.Hotels.Where(h => h.Name.Equals(name)).FirstOrDefault();
            if (dbHotel == null || dbHotel.Id != owner.hotelId)
            {
                return "There is no hotel with that name!";
            }
            else
            {
                _context.Hotels.Remove(dbHotel);
                _context.Users.Remove(owner);
                _context.SaveChanges();
                Hotel default_hotel = _context.Hotels.Where(h => h.Id.Equals(1)).FirstOrDefault();
                owner.hotel = default_hotel;
                _context.Users.Add(owner);
                _context.SaveChanges();
                return "The hotel profile has been  deleted!";
            }
        }

        public string UpdateHotel(string name, string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
            {
                return "You currently have no hotel profile created";
            }
            Hotel dbHotel = _context.Hotels.Where(h => h.Name.Equals(name)).FirstOrDefault();
            if (dbHotel == null)
            {
                dbHotel = _context.Hotels.Where(h => h.Id.Equals(owner.hotelId)).FirstOrDefault();
                dbHotel.Name = name;
                _context.Hotels.Update(dbHotel);
                _context.SaveChanges();
                return "The hotel profile has been  updated!";
            } 
            else
            {
                return "The name of the hotel is already taken!";
            }
        }

        public string AddEmployee(string name, string user_name)
        {
            User employee = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if(employee.hotelId != 1)
                return "The user already works at a hotel!";

            Hotel dbHotel = _context.Hotels.Where(h => h.Name.Equals(name)).FirstOrDefault();
            if (dbHotel == null || dbHotel.Id == 1)
                return "The hotel name does not exist!";
            _context.Users.Remove(employee);
            _context.SaveChanges();
            employee.hotel = dbHotel;
            _context.Users.Add(employee);
            _context.SaveChanges();
            return "The employee has been added at the hotel!";
        }

        public List<string> GetPersonall(string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
            {
                return new List<string>() { "the owner has not created a hotel yet" };
            }
            else
            {
                List<string> result = new List<string>();
                List<User> users = _context.Users
                                      .Where(s => s.hotelId == owner.hotelId)
                                      .ToList();
                for (int i = 0; i < users.Count; i++)
                {
                    if (users[i].role == "Personall")
                        result.Add(users[i].name);
                }
                return result;
            }
        }
    }
}
