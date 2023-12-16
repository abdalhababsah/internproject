<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    public function run()
    {
        DB::table('posts')->insert([
            [
                'user_id' => 1, // Assuming user with id 1 exists
                'content' => 'Sample post content',
                'media_url' => 'https://example.com/media/sample.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ]
            // Add more posts as needed
        ]);
    }
}

