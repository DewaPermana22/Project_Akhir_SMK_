using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("kelas_siswa")]
public partial class KelasSiswa
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("siswa_id")]
    public long SiswaId { get; set; }

    [Column("kelas_id")]
    public long KelasId { get; set; }

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [ForeignKey("KelasId")]
    [InverseProperty("KelasSiswas")]
    public virtual Kela Kelas { get; set; } = null!;

    [ForeignKey("SiswaId")]
    [InverseProperty("KelasSiswas")]
    public virtual User Siswa { get; set; } = null!;
}
