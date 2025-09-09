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
        Schema::create('news_likes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('news_id');
             $table->string('like_token');
            $table->timestamps();
            $table->foreign('news_id')->references('id')->on('berita')->onDelete('cascade');
            $table->unique(['news_id', 'like_token']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_likes');
    }
};
