<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvailabilitiesTable extends Migration
{
    public function up()
    {
        Schema::create('availabilities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_detail_id');
            $table->string('day_of_week');
            $table->time('open')->nullable();
            $table->time('close')->nullable();
            $table->boolean('closed')->default(false);
            $table->timestamps();

            $table->foreign('service_detail_id')->references('id')->on('service_details')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('availabilities');
    }
}
