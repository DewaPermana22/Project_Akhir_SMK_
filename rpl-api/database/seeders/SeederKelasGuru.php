<?php

namespace Database\Seeders;

use App\Models\KelasGuru;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeederKelasGuru extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KelasGuru::create([
            'guru_id' => 2,
            'kelas_id' => 1
        ]);
        KelasGuru::create([
            'guru_id' => 2,
            'kelas_id' => 2
        ]);
        KelasGuru::create([
            'guru_id' => 2,
            'kelas_id' => 3
        ]);
        KelasGuru::create([
            'guru_id' => 2,
            'kelas_id' => 4
        ]);
    }
}
