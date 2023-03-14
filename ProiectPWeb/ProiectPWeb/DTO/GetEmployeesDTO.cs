namespace ProiectPWeb.DTO
{
    public class GetEmployeesDTO
    {
        public string name { get; set; }
        public string surname { get; set; }
        public string role { get; set; }
        public string hotel_name { get; set; }

        public GetEmployeesDTO(string name, string surname, string role, string hotel_name)
        {
            this.name = name;
            this.surname = surname;
            this.role = role;
            this.hotel_name = hotel_name;
        }
    }
}
