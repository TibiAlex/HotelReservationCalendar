namespace ProiectPWeb.DTO
{
    public class GetReservationsResponseDTO
    {
        public int room_number { get; set; }
        public DateTime date { get; set; }
        public int reservation_id { get; set; }
        public int number_of_spaces { get; set; }

        public GetReservationsResponseDTO(int room_number, DateTime date, int reservation_id, int number_of_spaces)
        {
            this.room_number = room_number;
            this.date = date;
            this.reservation_id = reservation_id;
            this.number_of_spaces = number_of_spaces;
        }
    }
}
