<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    public function run()
    {
        DB::table('comments')->insert([
            [
                'post_id' => 1, // Assuming post with id 1 exists
                'user_id' => 1, // Assuming user with id 1 exists
                'comment_text' => 'This is a sample comment.',
                'created_at' => now(),
                'updated_at' => now()
            ]
            // Add more comments as needed
        ]);
    }
}
