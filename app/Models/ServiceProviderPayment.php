<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProviderPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_request_id',
        'service_provider_id',
        'amount',
        'commission',
        'amount_paid',
    ];

    // Define relationships
    public function serviceRequest()
    {
        return $this->belongsTo(ServiceRequest::class);
    }

    public function serviceProvider()
    {
        return $this->belongsTo(User::class, 'service_provider_id');
    }
}
