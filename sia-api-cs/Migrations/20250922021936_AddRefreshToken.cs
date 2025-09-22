using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace sia_api_cs.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cache",
                columns: table => new
                {
                    key = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    value = table.Column<string>(type: "text", nullable: false),
                    expiration = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("cache_pkey", x => x.key);
                });

            migrationBuilder.CreateTable(
                name: "cache_locks",
                columns: table => new
                {
                    key = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    owner = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    expiration = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("cache_locks_pkey", x => x.key);
                });

            migrationBuilder.CreateTable(
                name: "failed_jobs",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    uuid = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    connection = table.Column<string>(type: "text", nullable: false),
                    queue = table.Column<string>(type: "text", nullable: false),
                    payload = table.Column<string>(type: "text", nullable: false),
                    exception = table.Column<string>(type: "text", nullable: false),
                    failed_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("failed_jobs_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "job_batches",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    total_jobs = table.Column<int>(type: "integer", nullable: false),
                    pending_jobs = table.Column<int>(type: "integer", nullable: false),
                    failed_jobs = table.Column<int>(type: "integer", nullable: false),
                    failed_job_ids = table.Column<string>(type: "text", nullable: false),
                    options = table.Column<string>(type: "text", nullable: true),
                    cancelled_at = table.Column<int>(type: "integer", nullable: true),
                    created_at = table.Column<int>(type: "integer", nullable: false),
                    finished_at = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("job_batches_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "jobs",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    queue = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    payload = table.Column<string>(type: "text", nullable: false),
                    attempts = table.Column<short>(type: "smallint", nullable: false),
                    reserved_at = table.Column<int>(type: "integer", nullable: true),
                    available_at = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("jobs_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "kategori_berita",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    kategori = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("kategori_berita_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "kategori_pengumuman",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nama = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("kategori_pengumuman_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "kelas",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nama_kelas = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("kelas_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "migrations",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    migration = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    batch = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("migrations_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "password_reset_tokens",
                columns: table => new
                {
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    token = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("password_reset_tokens_pkey", x => x.email);
                });

            migrationBuilder.CreateTable(
                name: "personal_access_tokens",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tokenable_type = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    tokenable_id = table.Column<long>(type: "bigint", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    token = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    abilities = table.Column<string>(type: "text", nullable: true),
                    last_used_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    expires_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("personal_access_tokens_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "role_user",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("role_user_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sessions",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    ip_address = table.Column<string>(type: "character varying(45)", maxLength: 45, nullable: true),
                    user_agent = table.Column<string>(type: "text", nullable: true),
                    payload = table.Column<string>(type: "text", nullable: false),
                    last_activity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("sessions_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "status_user",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    status = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("status_user_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    role_id = table.Column<long>(type: "bigint", nullable: true),
                    status_id = table.Column<long>(type: "bigint", nullable: true),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    remember_token = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    profile_picture = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("users_pkey", x => x.id);
                    table.ForeignKey(
                        name: "users_role_id_foreign",
                        column: x => x.role_id,
                        principalTable: "role_user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "users_status_id_foreign",
                        column: x => x.status_id,
                        principalTable: "status_user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "berita",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    judul = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    kategori_id = table.Column<long>(type: "bigint", nullable: true),
                    user_id = table.Column<long>(type: "bigint", nullable: true),
                    gambar = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    isi = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    slug = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    views = table.Column<long>(type: "bigint", nullable: false, defaultValueSql: "'0'::bigint")
                },
                constraints: table =>
                {
                    table.PrimaryKey("berita_pkey", x => x.id);
                    table.ForeignKey(
                        name: "berita_kategori_id_foreign",
                        column: x => x.kategori_id,
                        principalTable: "kategori_berita",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "berita_user_id_foreign",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "kelas_guru",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    guru_id = table.Column<long>(type: "bigint", nullable: false),
                    kelas_id = table.Column<long>(type: "bigint", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("kelas_guru_pkey", x => x.id);
                    table.ForeignKey(
                        name: "kelas_guru_guru_id_foreign",
                        column: x => x.guru_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "kelas_guru_kelas_id_foreign",
                        column: x => x.kelas_id,
                        principalTable: "kelas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "kelas_siswa",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    siswa_id = table.Column<long>(type: "bigint", nullable: false),
                    kelas_id = table.Column<long>(type: "bigint", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("kelas_siswa_pkey", x => x.id);
                    table.ForeignKey(
                        name: "kelas_siswa_kelas_id_foreign",
                        column: x => x.kelas_id,
                        principalTable: "kelas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "kelas_siswa_siswa_id_foreign",
                        column: x => x.siswa_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pengumuman",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    judul_pengumuman = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    kategori_id = table.Column<long>(type: "bigint", nullable: false),
                    isi_pengumuman = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pengumuman_pkey", x => x.id);
                    table.ForeignKey(
                        name: "pengumuman_kategori_id_foreign",
                        column: x => x.kategori_id,
                        principalTable: "kategori_pengumuman",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "pengumuman_user_id_foreign",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    Expires = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Revoked = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId1 = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pengumuman_kelas",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    kelas_id = table.Column<long>(type: "bigint", nullable: false),
                    pengumuman_id = table.Column<long>(type: "bigint", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp(0) without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pengumuman_kelas_pkey", x => x.id);
                    table.ForeignKey(
                        name: "pengumuman_kelas_kelas_id_foreign",
                        column: x => x.kelas_id,
                        principalTable: "kelas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "pengumuman_kelas_pengumuman_id_foreign",
                        column: x => x.pengumuman_id,
                        principalTable: "pengumuman",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "berita_slug_unique",
                table: "berita",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_berita_kategori_id",
                table: "berita",
                column: "kategori_id");

            migrationBuilder.CreateIndex(
                name: "IX_berita_user_id",
                table: "berita",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "failed_jobs_uuid_unique",
                table: "failed_jobs",
                column: "uuid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "jobs_queue_index",
                table: "jobs",
                column: "queue");

            migrationBuilder.CreateIndex(
                name: "IX_kelas_guru_guru_id",
                table: "kelas_guru",
                column: "guru_id");

            migrationBuilder.CreateIndex(
                name: "IX_kelas_guru_kelas_id",
                table: "kelas_guru",
                column: "kelas_id");

            migrationBuilder.CreateIndex(
                name: "IX_kelas_siswa_kelas_id",
                table: "kelas_siswa",
                column: "kelas_id");

            migrationBuilder.CreateIndex(
                name: "IX_kelas_siswa_siswa_id",
                table: "kelas_siswa",
                column: "siswa_id");

            migrationBuilder.CreateIndex(
                name: "IX_pengumuman_kategori_id",
                table: "pengumuman",
                column: "kategori_id");

            migrationBuilder.CreateIndex(
                name: "IX_pengumuman_user_id",
                table: "pengumuman",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_pengumuman_kelas_kelas_id",
                table: "pengumuman_kelas",
                column: "kelas_id");

            migrationBuilder.CreateIndex(
                name: "IX_pengumuman_kelas_pengumuman_id",
                table: "pengumuman_kelas",
                column: "pengumuman_id");

            migrationBuilder.CreateIndex(
                name: "personal_access_tokens_expires_at_index",
                table: "personal_access_tokens",
                column: "expires_at");

            migrationBuilder.CreateIndex(
                name: "personal_access_tokens_token_unique",
                table: "personal_access_tokens",
                column: "token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "personal_access_tokens_tokenable_type_tokenable_id_index",
                table: "personal_access_tokens",
                columns: new[] { "tokenable_type", "tokenable_id" });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId1",
                table: "RefreshTokens",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "sessions_last_activity_index",
                table: "sessions",
                column: "last_activity");

            migrationBuilder.CreateIndex(
                name: "sessions_user_id_index",
                table: "sessions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_role_id",
                table: "users",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_status_id",
                table: "users",
                column: "status_id");

            migrationBuilder.CreateIndex(
                name: "users_email_unique",
                table: "users",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "berita");

            migrationBuilder.DropTable(
                name: "cache");

            migrationBuilder.DropTable(
                name: "cache_locks");

            migrationBuilder.DropTable(
                name: "failed_jobs");

            migrationBuilder.DropTable(
                name: "job_batches");

            migrationBuilder.DropTable(
                name: "jobs");

            migrationBuilder.DropTable(
                name: "kelas_guru");

            migrationBuilder.DropTable(
                name: "kelas_siswa");

            migrationBuilder.DropTable(
                name: "migrations");

            migrationBuilder.DropTable(
                name: "password_reset_tokens");

            migrationBuilder.DropTable(
                name: "pengumuman_kelas");

            migrationBuilder.DropTable(
                name: "personal_access_tokens");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "sessions");

            migrationBuilder.DropTable(
                name: "kategori_berita");

            migrationBuilder.DropTable(
                name: "kelas");

            migrationBuilder.DropTable(
                name: "pengumuman");

            migrationBuilder.DropTable(
                name: "kategori_pengumuman");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "role_user");

            migrationBuilder.DropTable(
                name: "status_user");
        }
    }
}
