<?php

namespace Database\Seeders;

use App\Models\KategoriPengumuman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeederKategoriPengumuman extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KategoriPengumuman::create([
            'nama' => 'Semua',
        ]);
        KategoriPengumuman::create([
            'nama' => 'Akademik',
        ]);
        KategoriPengumuman::create([
            'nama' => 'Tugas',
        ]);
        KategoriPengumuman::create([
            'nama' => 'Kegiatan',
        ]);
        KategoriPengumuman::create([
            'nama' => 'Informasi',
        ]);
    }
}
