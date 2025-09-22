using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("users")]
[Index("Email", Name = "users_email_unique", IsUnique = true)]
public partial class User
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("name")]
    [StringLength(255)]
    public string Name { get; set; } = null!;

    [Column("email")]
    [StringLength(255)]
    public string Email { get; set; } = null!;

    [Column("role_id")]
    public long? RoleId { get; set; }

    [Column("status_id")]
    public long? StatusId { get; set; }

    [Column("password")]
    [StringLength(255)]
    public string Password { get; set; } = null!;

    [Column("remember_token")]
    [StringLength(100)]
    public string? RememberToken { get; set; }

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [Column("profile_picture")]
    [StringLength(255)]
    public string? ProfilePicture { get; set; }

    [InverseProperty("User")]
    public virtual ICollection<Beritum> Berita { get; set; } = new List<Beritum>();

    [InverseProperty("Guru")]
    public virtual ICollection<KelasGuru> KelasGurus { get; set; } = new List<KelasGuru>();

    [InverseProperty("Siswa")]
    public virtual ICollection<KelasSiswa> KelasSiswas { get; set; } = new List<KelasSiswa>();

    [InverseProperty("User")]
    public virtual ICollection<Pengumuman> Pengumumen { get; set; } = new List<Pengumuman>();

    [ForeignKey("RoleId")]
    [InverseProperty("Users")]
    public virtual RoleUser? Role { get; set; }

    [ForeignKey("StatusId")]
    [InverseProperty("Users")]
    public virtual StatusUser? Status { get; set; }

    [InverseProperty("User")]
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
