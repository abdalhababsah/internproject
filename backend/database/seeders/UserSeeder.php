<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Fetch roles from the database
        $roles = DB::table('roles')->pluck('role_id', 'name');

        // Define users for each role
        $usersData = [
            [
                'role_id' => $roles['User'],
                'name' => 'John User',
                'username' => 'johnuser',
                'email' => 'johnuser@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'role_id' => $roles['Content Creator'],
                'name' => 'Alice Creator',
                'username' => 'alicecreator',
                'email' => 'alicecreator@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'role_id' => $roles['Community Moderator'],
                'name' => 'Charlie Moderator',
                'username' => 'charliemoderator',
                'email' => 'charliemoderator@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'role_id' => $roles['Administrator'],
                'name' => 'Diana Admin',
                'username' => 'dianaadmin',
                'email' => 'dianaadmin@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('users')->insert($usersData);
    }
}
