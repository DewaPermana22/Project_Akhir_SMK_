<?php

namespace Database\Seeders;

use App\Models\RoleUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeederRoleUSer extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RoleUser::create([
            'role' => 'Admin',
        ]);
        RoleUser::create([
            'role' => 'Guru',
        ]);
        RoleUser::create([
            'role' => 'Alumni',
        ]);
        RoleUser::create([
            'role' => 'Siswa',
        ]);
    }
}
