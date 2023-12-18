<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Fetch roles from the database
        $roles = DB::table('roles')->pluck('role_id', 'name');
        $min_date = Carbon::createFromDate(1990, 1, 1);
        $max_date = Carbon::createFromDate(2010, 12, 31);

        // $random_date = $min_date->copy()->addSeconds(mt_rand(0, $max_date->diffInSeconds($min_date)));


        // Define users for each role
        $usersData = [
            [
                'role_id' => $roles['User'],
                'name' => 'John User',
                'username' => 'johnuser',
                'email' => 'johnuser@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
                'birth_date' => $min_date->copy()->addSeconds(mt_rand(0, $max_date->diffInSeconds($min_date)))->format('Y-m-d')
            ],
            [
                'role_id' => $roles['Content Creator'],
                'name' => 'Alice Creator',
                'username' => 'alicecreator',
                'email' => 'alicecreator@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
                'birth_date' => $min_date->copy()->addSeconds(mt_rand(0, $max_date->diffInSeconds($min_date)))->format('Y-m-d')
            ],
            [
                'role_id' => $roles['Community Moderator'],
                'name' => 'Charlie Moderator',
                'username' => 'charliemoderator',
                'email' => 'charliemoderator@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
                'birth_date' => $min_date->copy()->addSeconds(mt_rand(0, $max_date->diffInSeconds($min_date)))->format('Y-m-d')
            ],
            [
                'role_id' => $roles['Administrator'],
                'name' => 'Diana Admin',
                'username' => 'dianaadmin',
                'email' => 'dianaadmin@example.com',
                'password_hash' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
             'birth_date' => $min_date->copy()->addSeconds(mt_rand(0, $max_date->diffInSeconds($min_date)))->format('Y-m-d')
            ]
        ];

        DB::table('users')->insert($usersData);
    }
}
