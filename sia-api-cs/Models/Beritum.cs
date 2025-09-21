using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("berita")]
[Index("Slug", Name = "berita_slug_unique", IsUnique = true)]
public partial class Beritum
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("judul")]
    [StringLength(255)]
    public string Judul { get; set; } = null!;

    [Column("kategori_id")]
    public long? KategoriId { get; set; }

    [Column("user_id")]
    public long? UserId { get; set; }

    [Column("gambar")]
    [StringLength(255)]
    public string? Gambar { get; set; }

    [Column("isi")]
    public string Isi { get; set; } = null!;

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [Column("slug")]
    [StringLength(255)]
    public string Slug { get; set; } = null!;

    [Column("views")]
    public long Views { get; set; }

    [ForeignKey("KategoriId")]
    [InverseProperty("Berita")]
    public virtual KategoriBeritum? Kategori { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Berita")]
    public virtual User? User { get; set; }
}
