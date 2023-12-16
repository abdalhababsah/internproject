<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FriendRequestSeeder extends Seeder
{
    public function run()
    {
        DB::table('friend_requests')->insert([
            [
                'sender_id' => 1, // Assuming user with id 1 exists
                'receiver_id' => 2, // Assuming user with id 2 exists
                'status' => 'Pending',
                'created_at' => now(),
                'updated_at' => now()
            ]
            // Add more friend requests as needed
        ]);
    }
}
