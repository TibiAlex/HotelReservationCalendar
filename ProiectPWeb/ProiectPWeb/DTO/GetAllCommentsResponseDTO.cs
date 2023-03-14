namespace ProiectPWeb.DTO
{
    public class GetAllCommentsResponseDTO
    {
        public string message { get; set; }
        public int id { get; set; }
        public string writer { get; set; }

        public GetAllCommentsResponseDTO(string message, int id, string writer)
        {
            this.message = message;
            this.id = id;
            this.writer = writer;
        }
    }
}
