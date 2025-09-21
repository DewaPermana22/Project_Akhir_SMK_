using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("kategori_pengumuman")]
public partial class KategoriPengumuman
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("nama")]
    [StringLength(255)]
    public string Nama { get; set; } = null!;

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [InverseProperty("Kategori")]
    public virtual ICollection<Pengumuman> Pengumumen { get; set; } = new List<Pengumuman>();
}
