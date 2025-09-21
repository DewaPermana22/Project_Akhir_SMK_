using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("pengumuman")]
public partial class Pengumuman
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("judul_pengumuman")]
    [StringLength(255)]
    public string JudulPengumuman { get; set; } = null!;

    [Column("user_id")]
    public long UserId { get; set; }

    [Column("kategori_id")]
    public long KategoriId { get; set; }

    [Column("isi_pengumuman")]
    public string IsiPengumuman { get; set; } = null!;

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [ForeignKey("KategoriId")]
    [InverseProperty("Pengumumen")]
    public virtual KategoriPengumuman Kategori { get; set; } = null!;

    [InverseProperty("Pengumuman")]
    public virtual ICollection<PengumumanKela> PengumumanKelas { get; set; } = new List<PengumumanKela>();

    [ForeignKey("UserId")]
    [InverseProperty("Pengumumen")]
    public virtual User User { get; set; } = null!;
}
