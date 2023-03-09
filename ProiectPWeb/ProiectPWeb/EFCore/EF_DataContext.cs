using Microsoft.EntityFrameworkCore;

namespace ProiectPWeb.EFCore
{
    public class EF_DataContext : DbContext
    {
        public EF_DataContext(DbContextOptions<EF_DataContext> options): base(options) { }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Hotel>().HasData(
                new Hotel
                {
                    Id = 1,
                    Name = "default",
                    number_of_free_spaces = 0,
                    number_of_rooms = 0,
                    number_of_spaces = 0,
                },
                new Hotel
                {
                    Id = 2,
                    Name = "Enziem Wien Hotel",
                    number_of_free_spaces = 10,
                    number_of_rooms = 5,
                    number_of_spaces = 10,
                }
            );
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
