<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRevenueTable extends Migration
{
    public function up()
    {
        Schema::create('revenue', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->decimal('revenue_generated', 10, 2)->default(0);
            $table->decimal('total_revenue', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('revenue');
    }
}
