<?php

namespace App\Models;

use App\Models\ServiceRequest;
use App\Models\ServiceProvider;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_provider_id',
        'service_request_id',
        'status',
        'amount',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class);
    }

    public function serviceRequest()
    {
        return $this->belongsTo(ServiceRequest::class);
    }
}
