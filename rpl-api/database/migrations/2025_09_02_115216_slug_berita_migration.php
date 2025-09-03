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

        Schema::table('berita', function(Blueprint $table){

            if (Schema::hasColumn('berita', 'penulis')) {
                $table->dropColumn('penulis');
            }
            
            $table->string('slug')->unique()->after('judul');
        });
    }

    public function down(): void
    {
        
    }
};
