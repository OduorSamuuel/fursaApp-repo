<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_providers_id');
            $table->foreign('service_providers_id')->references('id')->on('service_providers')->onDelete('cascade');
<<<<<<< HEAD:database/migrations/2024_06_09_163812_create_ratings_table.php
            $table->unsignedBigInteger('user_id'); // Add user_id field
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Reference to users table
=======
>>>>>>> 91006da72eb6664cb35fecf3231cb7b0c67ab617:database/migrations/2024_06_09_163813_create_ratings_table.php
            $table->unsignedTinyInteger('rating'); // Assuming ratings are from 1 to 5
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
 {
        Schema::dropIfExists('ratings');
    }
}
