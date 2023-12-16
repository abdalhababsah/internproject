<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Seed the Roles first
        $this->call(RoleSeeder::class);

        // Seed the Users next
        $this->call(UserSeeder::class);

        // The rest of the seeders can follow
        $this->call(PostSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(FriendRequestSeeder::class);
        $this->call(MessageSeeder::class);
        $this->call(ReportSeeder::class);
        $this->call(AnalyticSeeder::class);
    }
}

