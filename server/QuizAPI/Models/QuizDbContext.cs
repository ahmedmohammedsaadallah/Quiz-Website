using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizDbContext:DbContext
    {
        public QuizDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Question> Questions { get; set; }
    }
}
