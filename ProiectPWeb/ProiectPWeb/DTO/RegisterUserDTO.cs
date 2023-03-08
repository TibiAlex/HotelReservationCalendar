using ProiectPWeb.EFCore;
using ProiectPWeb.Enums;

namespace ProiectPWeb.DTO
{
    public class RegisterUserDTO
    {
        public string name { get; set; } = string.Empty;
        public string surname { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string role { get; set; } = string.Empty;
    }
}
