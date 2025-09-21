<?php

namespace Database\Seeders;

use App\Models\KelasSiswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeederKelasSiswa extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KelasSiswa::create([
            'siswa_id' => 1,
            'kelas_id' => 1,
        ]);
    }
}
