using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using sia_api_cs.DTO.Authentication;
using sia_api_cs.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Resources;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace sia_api_cs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class authController : ControllerBase
    {
        readonly IConfiguration _config;
        readonly AppDbContext _db;
        public authController(IConfiguration configuration, AppDbContext db)
        {
            _config = configuration;
            _db = db;
        }

        //Fungsi set Token ke Cookies
        private void setCookies(string accessToken, string refreshToken)
        {
            // Cookie options untuk access token
            var accessTokenCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["JWT:AccessTokenExpirationMinutes"]))
            };

            // Cookie options untuk refresh token
            var refreshTokenCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(_config["JWT:RefreshTokenExpirationDays"]))
            };

            Response.Cookies.Append("accessToken", accessToken, accessTokenCookieOptions);
            Response.Cookies.Append("refreshToken", refreshToken, refreshTokenCookieOptions);
        }

        //Fungsi Generate Token
        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:TokenSecret"]!));
            var claim = new[]
            {
                new Claim("UserID", user.Id.ToString(), ClaimValueTypes.Integer),
                new Claim("RoleID", user.RoleId.ToString(), ClaimValueTypes.Integer)
            };
            var token = new JwtSecurityToken(
                claims: claim,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["JWT:AccessTokenExpirationMinutes"]!)),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //Fungsi Generate Token
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        //Logika untuk refresh token jwt
        private async Task<RefreshToken> GenerateRefreshTokenAsync(long userId)
        {
            var rfrshToken = new RefreshToken
            {
                UserId = userId,
                Token = GenerateRefreshToken(),
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(_config["JWT:RefreshTokenExpirationDays"]))
            };

            _db.RefreshTokens.Add(rfrshToken);
            await _db.SaveChangesAsync();

            return rfrshToken;
        }

        //Login Endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthDTO dto)
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

            var oldToken = _db.RefreshTokens.Where(usr => usr.UserId == user.Id).FirstOrDefault();
            if (oldToken != null)
            {
                _db.RefreshTokens.RemoveRange(oldToken);
                await _db.SaveChangesAsync();
            }

            string token = GenerateToken(user);
            var refreshToken = await GenerateRefreshTokenAsync(Convert.ToInt32(user.Id));

            //set cookie
            setCookies(token, refreshToken.Token);
            return Ok(new
            {
                success = true,
                access_token = token,
                refresh_token = refreshToken.Token,
                expires_in = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["JWT:AccessTokenExpirationMinutes"]!) * 60)
            });
        }

        //Refresh Token Endpoint
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken(RefreshTokenDTO dto)
        {
            if (string.IsNullOrEmpty(dto.RefreshToken))
            {
                return BadRequest(new { message = "Refresh token is required" });
            }

            var storedToken = await _db.RefreshTokens.Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == dto.RefreshToken);

            if (storedToken == null)
            {
                return Unauthorized(new { message = "Invalid Refresh Token!" });
            }

            if (!storedToken.IsActive)
            {
                return Unauthorized(new { message = "Refresh token Expired or Revoked" });
            }

            var newAccsToken = GenerateToken(storedToken.User);
            var newRefreshToken = await GenerateRefreshTokenAsync(storedToken.UserId);

            _db.RefreshTokens.Remove(storedToken);
            await _db.SaveChangesAsync();

            //Set cookie
            setCookies(newAccsToken, newRefreshToken.Token);

            return Ok(new
            {
                accessToken = newAccsToken,
                RefreshToken = newRefreshToken,
                expiresIn = Convert.ToInt32(_config["Jwt:AccessTokenExpirationMinutes"]) * 60
            });
        }

        //Revoke Token Endpoint
        [HttpPost("revoke")]
        public async Task<IActionResult> RevokeToken(RefreshTokenDTO dto)
        {
            if (string.IsNullOrEmpty(dto.RefreshToken))
            {
                return BadRequest(new { message = "Refresh token is Required!" });
            }

            var rfreshToken = await _db.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == dto.RefreshToken);

            if (rfreshToken == null)
            {
                return NotFound(new { message = "Refresh Token not found!, please check your Token!" });
            }

            if (!rfreshToken.IsActive)
            {
                return BadRequest(new { message = "Refresh Token already expired or revoked" });
            }

            rfreshToken.Revoked = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Refresj Token revoked succesfully!" });
        }

        //Logout Endpoint
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken");
            Response.Cookies.Delete("refreshToken");

            return Ok(new { message = "Logout Successfuly!" });
        }
    }
}
