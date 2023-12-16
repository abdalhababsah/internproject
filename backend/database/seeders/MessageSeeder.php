<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessageSeeder extends Seeder
{
    public function run()
    {
        DB::table('messages')->insert([
            [
                'sender_id' => 1, // Assuming user with id 1 exists
                'receiver_id' => 2, // Assuming user with id 2 exists
                'message_text' => 'Hello, this is a sample message.',
                'created_at' => now(),
                'updated_at' => now()
            ]
            // Add more messages as needed
        ]);
    }
}
