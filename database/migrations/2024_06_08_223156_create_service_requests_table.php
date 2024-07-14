<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade'); // Cascade delete when a user is deleted
            $table->foreignId('service_provider_id')
                  ->constrained('service_providers')
                  ->onDelete('cascade'); // Cascade delete when a service provider is deleted
            $table->foreignId('service_detail_id')
                  ->constrained('service_details')
                  ->onDelete('cascade'); // Cascade delete when a service detail is deleted
            $table->enum('status', ['Pending', 'Accepted', 'Rejected', 'Completed', 'CancelledByUser', 'CancelledByProvider'])
                  ->default('Pending');
            $table->dateTime('booking_date');
            $table->string('location')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->enum('payment_status', ['Pending', 'Paid', 'Failed'])
                  ->default('Pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_requests');
    }
}
