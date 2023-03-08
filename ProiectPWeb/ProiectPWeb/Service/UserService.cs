using ProiectPWeb.EFCore;
using ProiectPWeb.DTO;
using System.Security.Cryptography;
using System.Reflection.Metadata;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Data;

namespace ProiectPWeb.Service
{
    public class UserService
    {
        private EF_DataContext _context;
        private readonly IConfiguration _configuration;
        public UserService(EF_DataContext context, IConfiguration configuration) 
        { 
            _context = context;
            _configuration = configuration;
        }

        public string SaveUser(RegisterUserDTO user)
        {
            if (user.name.IsNullOrEmpty() ||
                user.surname.IsNullOrEmpty() ||
                user.password.IsNullOrEmpty() ||
                user.role.IsNullOrEmpty())
            {
                return "empty field";
            }
            User dbTable = _context.Users.Where(u => u.name.Equals(user.name)).FirstOrDefault();
            if (dbTable != null)
            {
                return "name taken";
            }
            else
            {
                dbTable = new User();
                dbTable.name = user.name;
                dbTable.surname = user.surname;
                CreatePasswordHash(user.password, out byte[] password_hash, out byte[] password_salt);
                dbTable.password_hash = password_hash;
                dbTable.password_salt = password_salt;
                if (user.role.Equals("Owner") || user.role.Equals("Personall"))
                {
                    dbTable.role = user.role;
                }
                dbTable.hotel = _context.Hotels.Where(f => f.Id.Equals(1)).FirstOrDefault();
                _context.Users.Add(dbTable);
                _context.SaveChanges();
                return "user created";
            } 
        }

        private void CreatePasswordHash(string password, out byte[] password_hash, out byte[] password_salt)
        {
            using(var hmac = new HMACSHA512())
            {
                password_salt = hmac.Key;
                password_hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public string LoginUser(LoginUserDTO user)
        {
            
            User dbTable = _context.Users.Where(u => u.name.Equals(user.name)).FirstOrDefault();
            if (dbTable == null)
            {
                return "no such user";
            }
            else
            {
                bool verify_password = VerifyPasswordHash(user.password, dbTable.password_hash, dbTable.password_salt);
                if (verify_password)
                {
                    return CreateToken(dbTable);
                }
                else
                {
                    return "wrong password";
                }
            }

        }

        private bool VerifyPasswordHash(string password, byte[] password_hash, byte[] password_salt)
        {
            using(var hmac = new HMACSHA512(password_salt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(password_hash);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.name),
                new Claim(ClaimTypes.Role, user.role),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
