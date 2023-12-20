<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id('comment_id');
            $table->foreignId('post_id')
                ->unsigned()
                ->references('post_id')
                ->on('posts')
                ->onDelete('cascade');
            // $table->unsignedBigInteger('post_id')->constrained('posts')->onDelete('cascade');
            $table->foreignId('user_id')
                ->unsigned()
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');
            // $table->unsignedBigInteger('user_id')->constrained('users')->onDelete('cascade');
            $table->text('comment_text');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
