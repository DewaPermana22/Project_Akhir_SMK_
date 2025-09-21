using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using sia_api_cs.DTO;
using sia_api_cs.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace sia_api_cs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _config;
        readonly AppDbContext _db;
        public AuthController(IConfiguration configuration, AppDbContext db)
        {
            _config = configuration;
            _db = db;
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["token"]!));
            var claim = new[]
            {
                new Claim("UserID", user.Id.ToString(), ClaimValueTypes.Integer),
                new Claim("RoleID", user.RoleId.ToString(), ClaimValueTypes.Integer)
            };
            var token = new JwtSecurityToken(
                claims: claim,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("login")]
        public IActionResult Login(AuthDTO dto)
        {
            var user = _db.Users.FirstOrDefault(usr => usr.Email == dto.email);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found" });
            }

            bool verified = BCrypt.Net.BCrypt.Verify(dto.password, user.Password);

            if (!verified)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            string token = GenerateToken(user);
            return Ok(new { token });
        }

    }
}
