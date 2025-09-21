using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("kategori_berita")]
public partial class KategoriBeritum
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("kategori")]
    [StringLength(255)]
    public string Kategori { get; set; } = null!;

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [InverseProperty("Kategori")]
    public virtual ICollection<Beritum> Berita { get; set; } = new List<Beritum>();
}
