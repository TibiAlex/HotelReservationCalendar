using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProiectPWeb.EFCore
{
    [Table("Rooms")]
    public class Room
    {
        [Key, Required] public int Id { get; set; }
        [Required] public int number { get; set; }
        [Required] public int number_of_persons { get; set; }
        [ForeignKey("Hotel")]
        public int hotelId { get; set; }
        public virtual Hotel hotel { get; set; }
        public ICollection<Reservation> reservations { get; set; }
    }
}
