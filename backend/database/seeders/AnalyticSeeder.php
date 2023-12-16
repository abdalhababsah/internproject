<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnalyticSeeder extends Seeder
{
    public function run()
    {
        DB::table('analytics')->insert([
            [
                'post_id' => 1, // Assuming post with id 1 exists
                'views_count' => 100,
                'likes_count' => 50,
                'comments_count' => 10,
                'created_at' => now(),
                'updated_at' => now()
            ]
            // Add more analytics data as needed
        ]);
    }
}
