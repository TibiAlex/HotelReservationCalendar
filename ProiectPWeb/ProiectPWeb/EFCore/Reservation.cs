using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProiectPWeb.EFCore
{
    [Table("Reservations")]
    public class Reservation
    {
        [Key, Required] public int Id { get; set; }
        [Required] public DateTime dateTime { get; set; }
        [ForeignKey("Rooms")]
        public int roomId { get; set; }
        public virtual Room room { get; set; }
    }
}
