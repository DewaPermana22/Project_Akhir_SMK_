using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

[Table("status_user")]
public partial class StatusUser
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("status")]
    [StringLength(255)]
    public string Status { get; set; } = null!;

    [Column("created_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp(0) without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [InverseProperty("Status")]
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
