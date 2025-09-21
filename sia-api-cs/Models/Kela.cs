using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("kelas")]
public partial class Kela
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("nama_kelas")]
    [StringLength(255)]
    public string NamaKelas { get; set; } = null!;

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [InverseProperty("Kelas")]
    public virtual ICollection<KelasGuru> KelasGurus { get; set; } = new List<KelasGuru>();

    [InverseProperty("Kelas")]
    public virtual ICollection<KelasSiswa> KelasSiswas { get; set; } = new List<KelasSiswa>();

    [InverseProperty("Kelas")]
    public virtual ICollection<PengumumanKela> PengumumanKelas { get; set; } = new List<PengumumanKela>();
}
