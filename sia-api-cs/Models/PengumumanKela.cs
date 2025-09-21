using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("pengumuman_kelas")]
public partial class PengumumanKela
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("kelas_id")]
    public long KelasId { get; set; }

    [Column("pengumuman_id")]
    public long PengumumanId { get; set; }

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [ForeignKey("KelasId")]
    [InverseProperty("PengumumanKelas")]
    public virtual Kela Kelas { get; set; } = null!;

    [ForeignKey("PengumumanId")]
    [InverseProperty("PengumumanKelas")]
    public virtual Pengumuman Pengumuman { get; set; } = null!;
}
