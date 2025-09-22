using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sia_api_cs.Models;
using System.Security.Claims;

namespace sia_api_cs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class meController(AppDbContext db) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult GetUserLogedIn()
        {
            var userIdClaim = User.FindFirstValue("UserID");
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized(new { message = "Invalid token or user ID not found" });
            }
            var id_logedIn = Convert.ToInt32(userIdClaim);
            var data = db.Users.Where(f => f.Id == id_logedIn).Select(c => new {
                id = id_logedIn,
                name = c.Name,
                email = c.Email,
                role_id = c.RoleId,
                role_name = c.Role.Role
            }).ToList();
            return Ok(data);
        }
    }
}
