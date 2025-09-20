<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengumuman', function (Blueprint $table) {
            $table->id();
            $table->string('judul_pengumuman');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('kategori_id')->constrained('kategori_pengumuman')->onDelete('cascade');
            $table->text('isi_pengumuman');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengumuman');
    }
};
