using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProiectPWeb.EFCore
{
    [Table("Users")]
    public class User
    {
        [Key, Required] public int Id { get; set; }
        public string name { get; set; } = string.Empty;
        public string surname { get; set; } = string.Empty;
        public byte[] password_hash { get; set; }
        public byte[] password_salt { get; set; }
        public string role { get; set; } = string.Empty;
        [ForeignKey("Hotels")]
        public int hotelId { get; set; }
        public virtual Hotel hotel { get; set; }
        public virtual ICollection<Comment> comments { get; set; }
    }
}
