<?php

namespace Database\Seeders;

use App\Models\Kelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeederKelas extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kelas::create([
            'nama_kelas' => 'XII RPL 1',
        ]);
        Kelas::create([
            'nama_kelas' => 'XII RPL 2',
        ]);
        Kelas::create([
            'nama_kelas' => 'XI RPL 1',
        ]);
        Kelas::create([
            'nama_kelas' => 'XI RPL 2',
        ]);
        Kelas::create([
            'nama_kelas' => 'X RPL 1',
        ]);
        Kelas::create([
            'nama_kelas' => 'X RPL 2',
        ]);
    }
}
