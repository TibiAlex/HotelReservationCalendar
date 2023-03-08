using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProiectPWeb.EFCore
{
    [Table("Hotels")]
    public class Hotel
    {
        [Key, Required] public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        public int number_of_rooms { get; set; }
        public int number_of_spaces { get; set; }
        public int number_of_free_spaces { get; set; }
        public virtual ICollection<User> user { get; set; }
        public virtual ICollection<Room> rooms { get; set; }
    }
}
