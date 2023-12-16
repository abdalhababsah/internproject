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
            $table->unsignedBigInteger('reported_by_id')->constrained('users')->onDelete('cascade');
            $table->unsignedBigInteger('post_id')->constrained('posts')->onDelete('cascade');
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

