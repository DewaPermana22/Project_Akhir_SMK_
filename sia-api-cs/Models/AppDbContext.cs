using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace sia_api_cs.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Beritum> Berita { get; set; }

    public virtual DbSet<Cache> Caches { get; set; }

    public virtual DbSet<CacheLock> CacheLocks { get; set; }

    public virtual DbSet<FailedJob> FailedJobs { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<JobBatch> JobBatches { get; set; }

    public virtual DbSet<KategoriBeritum> KategoriBerita { get; set; }

    public virtual DbSet<KategoriPengumuman> KategoriPengumumen { get; set; }

    public virtual DbSet<Kela> Kelas { get; set; }

    public virtual DbSet<KelasGuru> KelasGurus { get; set; }

    public virtual DbSet<KelasSiswa> KelasSiswas { get; set; }

    public virtual DbSet<Migration> Migrations { get; set; }

    public virtual DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

    public virtual DbSet<Pengumuman> Pengumumen { get; set; }

    public virtual DbSet<PengumumanKela> PengumumanKelas { get; set; }

    public virtual DbSet<PersonalAccessToken> PersonalAccessTokens { get; set; }

    public virtual DbSet<RoleUser> RoleUsers { get; set; }

    public virtual DbSet<Session> Sessions { get; set; }

    public virtual DbSet<StatusUser> StatusUsers { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=rpl-api-database;Username=postgres;Password=dbdewa");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Beritum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("berita_pkey");

            entity.Property(e => e.Views).HasDefaultValueSql("'0'::bigint");

            entity.HasOne(d => d.Kategori).WithMany(p => p.Berita)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("berita_kategori_id_foreign");

            entity.HasOne(d => d.User).WithMany(p => p.Berita)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("berita_user_id_foreign");
        });

        modelBuilder.Entity<Cache>(entity =>
        {
            entity.HasKey(e => e.Key).HasName("cache_pkey");
        });

        modelBuilder.Entity<CacheLock>(entity =>
        {
            entity.HasKey(e => e.Key).HasName("cache_locks_pkey");
        });

        modelBuilder.Entity<FailedJob>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("failed_jobs_pkey");

            entity.Property(e => e.FailedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("jobs_pkey");
        });

        modelBuilder.Entity<JobBatch>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("job_batches_pkey");
        });

        modelBuilder.Entity<KategoriBeritum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("kategori_berita_pkey");
        });

        modelBuilder.Entity<KategoriPengumuman>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("kategori_pengumuman_pkey");
        });

        modelBuilder.Entity<Kela>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("kelas_pkey");
        });

        modelBuilder.Entity<KelasGuru>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("kelas_guru_pkey");

            entity.HasOne(d => d.Guru).WithMany(p => p.KelasGurus).HasConstraintName("kelas_guru_guru_id_foreign");

            entity.HasOne(d => d.Kelas).WithMany(p => p.KelasGurus).HasConstraintName("kelas_guru_kelas_id_foreign");
        });

        modelBuilder.Entity<KelasSiswa>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("kelas_siswa_pkey");

            entity.HasOne(d => d.Kelas).WithMany(p => p.KelasSiswas).HasConstraintName("kelas_siswa_kelas_id_foreign");

            entity.HasOne(d => d.Siswa).WithMany(p => p.KelasSiswas).HasConstraintName("kelas_siswa_siswa_id_foreign");
        });

        modelBuilder.Entity<Migration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("migrations_pkey");
        });

        modelBuilder.Entity<PasswordResetToken>(entity =>
        {
            entity.HasKey(e => e.Email).HasName("password_reset_tokens_pkey");
        });

        modelBuilder.Entity<Pengumuman>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pengumuman_pkey");

            entity.HasOne(d => d.Kategori).WithMany(p => p.Pengumumen).HasConstraintName("pengumuman_kategori_id_foreign");

            entity.HasOne(d => d.User).WithMany(p => p.Pengumumen).HasConstraintName("pengumuman_user_id_foreign");
        });

        modelBuilder.Entity<PengumumanKela>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pengumuman_kelas_pkey");

            entity.HasOne(d => d.Kelas).WithMany(p => p.PengumumanKelas).HasConstraintName("pengumuman_kelas_kelas_id_foreign");

            entity.HasOne(d => d.Pengumuman).WithMany(p => p.PengumumanKelas).HasConstraintName("pengumuman_kelas_pengumuman_id_foreign");
        });

        modelBuilder.Entity<PersonalAccessToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("personal_access_tokens_pkey");
        });

        modelBuilder.Entity<RoleUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("role_user_pkey");
        });

        modelBuilder.Entity<Session>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("sessions_pkey");
        });

        modelBuilder.Entity<StatusUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("status_user_pkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("users_role_id_foreign");

            entity.HasOne(d => d.Status).WithMany(p => p.Users)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("users_status_id_foreign");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("refreshtoken_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("userid");
            entity.Property(e => e.Token).HasColumnName("token");
            entity.Property(e => e.Expires).HasColumnName("expires");
            entity.Property(e => e.Revoked).HasColumnName("revoked");

            entity.HasOne(rt => rt.User)
                  .WithMany(u => u.RefreshTokens)
                  .HasForeignKey(rt => rt.UserId)
                  .OnDelete(DeleteBehavior.Cascade)
                  .HasConstraintName("fk_refreshtoken_users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
