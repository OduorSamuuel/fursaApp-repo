<?php
// database/migrations/xxxx_xx_xx_create_cancelled_requests_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCancelledRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('cancelled_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_request_id')->constrained('service_requests')->onDelete('cascade');
            $table->json('reasons'); // Store reasons as JSON
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cancelled_requests');
    }
}
