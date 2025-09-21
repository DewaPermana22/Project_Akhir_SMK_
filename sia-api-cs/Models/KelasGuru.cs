using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("kelas_guru")]
public partial class KelasGuru
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("guru_id")]
    public long GuruId { get; set; }

    [Column("kelas_id")]
    public long KelasId { get; set; }

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [ForeignKey("GuruId")]
    [InverseProperty("KelasGurus")]
    public virtual User Guru { get; set; } = null!;

    [ForeignKey("KelasId")]
    [InverseProperty("KelasGurus")]
    public virtual Kela Kelas { get; set; } = null!;
}
