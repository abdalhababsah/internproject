<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFriendRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('friend_requests', function (Blueprint $table) {
            $table->id('friend_request_id');
            $table->foreignId('sender_id')
                ->unsigned()
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');
                $table->foreignId('receiver_id')
                    ->unsigned()
                    ->references('user_id')
                    ->on('users')
                    ->onDelete('cascade');
            // $table->unsignedBigInteger('')->constrained('users')->onDelete('cascade');
            // $table->unsignedBigInteger('')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['Pending', 'Accepted', 'Rejected'])->default('Pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('friend_requests');
    }
}
