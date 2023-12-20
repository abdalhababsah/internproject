<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnalyticsTable extends Migration
{
    public function up()
    {
        Schema::create('analytics', function (Blueprint $table) {
            $table->id('analytics_id');
            $table->foreignId('post_id')
                ->unsigned()
                ->references('post_id')
                ->on('posts')
                ->onDelete('cascade');
            // $table->unsignedBigInteger('post_id')->constrained('posts')->onDelete('cascade');
            $table->integer('views_count')->default(0);
            $table->integer('likes_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('analytics');
    }
}
