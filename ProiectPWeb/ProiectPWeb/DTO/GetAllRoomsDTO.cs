namespace ProiectPWeb.DTO
{
    public class GetAllRoomsDTO
    {
        public int room_number { get; set; }
        public int number_of_spaces { get; set; }

        public GetAllRoomsDTO(int room_number, int number_of_spaces)
        {
            this.room_number = room_number;
            this.number_of_spaces = number_of_spaces;
        }
    }
}
