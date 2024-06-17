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
            $table->foreignId('user_id')->constrained('users');
            $table->string('company_name');
            $table->string('service_type');
            $table->string('contact_number');
            $table->string('address');
            $table->string('service_image')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->foreignId('county_id')->constrained('counties');
          

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_providers');
    }
}
