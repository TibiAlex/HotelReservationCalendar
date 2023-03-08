using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProiectPWeb.EFCore
{
    [Table("Comments")]
    public class Comment
    {
        [Key, Required] public int Id { get; set; }
        [Required] public string message { get; set; }
        public virtual User user { get; set; }
    }
}
