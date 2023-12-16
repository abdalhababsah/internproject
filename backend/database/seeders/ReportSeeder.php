<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ReportSeeder extends Seeder
{
    public function run()
    {
        DB::table('reports')->insert([
            [
                'reported_by_id' => 1, // Assuming user with id 1 exists
                'post_id' => 1, // Assuming post with id 1 exists
                'reason' => 'Inappropriate content',
                'status' => 'Pending',
                'created_at' => now(),
                'updated_at' => now()
            ]
            // Add more reports as needed
        ]);
    }
}
