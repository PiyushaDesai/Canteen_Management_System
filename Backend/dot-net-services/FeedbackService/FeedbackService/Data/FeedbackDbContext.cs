using FeedbackService.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FeedbackService.Data
{
    public class FeedbackDbContext : DbContext
    {
        public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options) : base(options) { }

        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
