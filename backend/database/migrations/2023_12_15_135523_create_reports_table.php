<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id('report_id');
            $table->foreignId('reported_by_id')
                ->unsigned()
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');
            // $table->unsignedBigInteger('')->constrained('users')->onDelete('cascade');
            $table->foreignId('post_id')
            ->unsigned()
            ->references('post_id')
            ->on('posts')
            ->onDelete('cascade');
            // $table->unsignedBigInteger('post_id')->constrained('posts')->onDelete('cascade');
            $table->text('reason');
            $table->enum('status', ['Pending', 'Reviewed'])->default('Pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reports');
    }
}

