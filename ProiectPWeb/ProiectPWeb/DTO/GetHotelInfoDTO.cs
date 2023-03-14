namespace ProiectPWeb.DTO
{
    public class GetHotelInfoDTO
    {
        public string Name { get; set; } = string.Empty;
        public int number_of_rooms { get; set; }
        public int number_of_spaces { get; set; }
        public int number_of_free_spaces { get; set; }
        public string role { get; set; }
    }
}
