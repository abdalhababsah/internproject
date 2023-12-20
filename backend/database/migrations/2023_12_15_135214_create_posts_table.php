<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id('post_id');
            $table->foreignId('user_id')
                ->unsigned()
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');
            // $table->unsignedBigInteger('')->constrained('users')->onDelete('cascade');
            $table->text('content');
            $table->string('media_url')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
