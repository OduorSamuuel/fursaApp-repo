<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceProvidersTable extends Migration
{
    public function up()
    {
        Schema::create('service_providers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade'); // Cascade delete when a user is deleted
            $table->string('company_name');
            $table->string('service_type');
            $table->string('contact_number');
            $table->string('address');
            $table->string('service_image')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->foreignId('county_id')
                  ->constrained('counties')
                  ->onDelete('cascade'); // Cascade delete when a county is deleted
            $table->double('latitude', 10, 6)->nullable(); // Adding latitude
            $table->double('longitude', 10, 6)->nullable(); // Adding longitude

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_providers');
    }
}
