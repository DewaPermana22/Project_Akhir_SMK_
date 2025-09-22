using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sia_api_cs.Models
{
    [Table("refreshtoken")]
    public class RefreshToken
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("userid")]
        [ForeignKey("user")]
        public long UserId { get; set; }

        [Required]
        [Column("token")]
        public string Token { get; set; } = string.Empty;

        [Required]
        [Column("expires")]
        public DateTime Expires { get; set; }

        [Column("revoked")]
        public DateTime? Revoked { get; set; }

        public bool IsExpired => DateTime.UtcNow >= Expires;
        public bool IsActive => Revoked == null && !IsExpired;

        
        public User User { get; set; } = null!;
    }

}
