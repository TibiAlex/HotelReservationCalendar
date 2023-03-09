using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProiectPWeb.DTO;
using ProiectPWeb.EFCore;

namespace ProiectPWeb.Service
{
    public class CommentService
    {
        private EF_DataContext _context;
        private readonly IConfiguration _configuration;
        public CommentService(EF_DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public string AddComment(AddCommentDTO comment, string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return "There is no hotel profile created!";
            if (comment.message.IsNullOrEmpty())
                return "Empty message!";
            Comment dbComment = new Comment();
            dbComment.user = owner;
            dbComment.message = comment.message;
            _context.Comments.Add(dbComment);
            _context.SaveChanges();
            return "The comment has been saved";
        }

        public string UpdateComment(UpdateCommentDTO comment, string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return "There is no hotel profile created!";
            if (comment.message.IsNullOrEmpty())
                return "Empty message!";
            Comment dbComment = _context.Comments.Where(c => c.Id.Equals(comment.Id)).FirstOrDefault();
            if (dbComment == null)
                return "The message does not exist!";
            dbComment.message = comment.message;
            _context.Comments.Update(dbComment);
            _context.SaveChanges();
            return "The comment has been saved";
        }

        public string DeleteComment(int id, string user_name)
        {
            User owner = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (owner.hotelId == 1)
                return "There is no hotel profile created!";
            Comment dbComment = _context.Comments.Where(c => c.Id.Equals(id)).FirstOrDefault();
            if (dbComment == null)
                return "The message does not exist!";
            _context.Comments.Remove(dbComment);
            _context.SaveChanges();
            return "The comment has been deleted";
        }

        public List<string> GetAllComments(string user_name)
        {
            User user = _context.Users.Where(u => u.name.Equals(user_name)).FirstOrDefault();
            if (user.hotelId == 1)
                return new List<string>() { "There is no hotel profile created!" };
            List<string> result = new List<string>();
            User owner = _context.Users
                        .Include(u => u.comments)
                        .Where(u => u.hotelId.Equals(user.hotelId) && u.role.Equals("Owner"))
                        .FirstOrDefault();
            foreach(Comment comment in owner.comments)
            {
                result.Add(comment.message);
            }
            return result;
        }
    }
}
