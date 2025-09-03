<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SeederUsers extends Seeder
{
    public function run(): void
    {
        // User::create([
        //     'name' => 'Dewa Permana',
        //     'email' => 'dewaprmanaptr@gmailcom',
        //     'role_id' => 4,
        //     'status_id' => 2,
        //     'password' => Hash::make('0987654321'),
        // ]);

        User::create([
            'name' => 'Setyo Puji',
            'email' => 'setyopuji@gmailcom',
            'role_id' => 2,
            'status_id' => 2,
            'password' => Hash::make('9988776655443322'),
        ]);
    }
}
