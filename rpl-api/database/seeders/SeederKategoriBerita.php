<?php

namespace Database\Seeders;

use App\Models\ModelKategoriBerita;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeederKategoriBerita extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModelKategoriBerita::create([
            'kategori' => 'Prestasi',
        ]);
    }
}
