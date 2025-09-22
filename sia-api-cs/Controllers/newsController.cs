using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sia_api_cs.Models;

namespace sia_api_cs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly AppDbContext db;

        // Constructor injection
        public NewsController(AppDbContext context)
        {
            db = context;
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestNews()
        {
            var newsLatestData = await db.Berita
                .OrderByDescending(nl => nl.CreatedAt)
                .Take(8).Select(nl => new
                {
                    id = nl.Id,
                    judul = nl.Judul,
                    slug = nl.Slug,
                    kategori = nl.Kategori != null ? nl.Kategori.Kategori : "Uncategorize",
                    author = nl.User != null ? nl.User.Name : "Anonymous",
                    gambar = nl.Gambar,
                    isi_singkat = nl.Isi.Substring(0, 70) + "...",
                    created_at = nl.CreatedAt,
                    last_updated = nl.UpdatedAt,
                    views = nl.Views,
                })
                .ToListAsync();

            if (!newsLatestData.Any())
            {
                return NotFound(new { message = "Belum ada Berita terbaru untuk saat ini!" });
            }

            return Ok(new
            {
                success = true,
                message = "Berhasil mengambil data berita terbaru!",
                data = newsLatestData
            });
        }
    }
}
