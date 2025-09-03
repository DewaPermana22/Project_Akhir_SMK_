<?php

namespace Database\Seeders;

use App\Models\StatusUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeederStatusUSer extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StatusUser::create([
            'status' => 'Master',
        ]);
        StatusUser::create([
            'status' => 'Aktif',
        ]);
        StatusUser::create([
            'status' => 'Lulus',
        ]);
    }
}
