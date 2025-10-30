using Microsoft.AspNetCore.Mvc;
using FeedbackService.Models;
using FeedbackService.Data;

namespace FeedbackService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackDbContext _context;

        public FeedbackController(FeedbackDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Feedbacks.ToList());
        }

        [HttpPost]
        public IActionResult Submit([FromBody] Feedback feedback)
        {
            if (feedback == null || string.IsNullOrWhiteSpace(feedback.Email) || string.IsNullOrWhiteSpace(feedback.Message))
            {
                return BadRequest(new { message = "Email and message are required." });
            }

            _context.Feedbacks.Add(feedback);
            _context.SaveChanges();
            return Ok(new { message = "Feedback submitted successfully!" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var fb = _context.Feedbacks.Find(id);
            if (fb == null) return NotFound();

            _context.Feedbacks.Remove(fb);
            _context.SaveChanges();
            return Ok(new { message = "Feedback deleted successfully!" });
        }
    }
}
