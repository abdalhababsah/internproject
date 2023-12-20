<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id('message_id');
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
            // $table->unsignedBigInteger('sender_id')->constrained('users')->onDelete('cascade');
            // $table->unsignedBigInteger('receiver_id')->constrained('users')->onDelete('cascade');
            $table->text('message_text');
            $table->string('attachment_url')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
