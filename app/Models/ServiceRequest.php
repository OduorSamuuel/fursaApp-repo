<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_provider_id',
        'service_detail_id', // Add the service_detail_id column
        'booking_date',
        'location',
        'status',
        'amount',
        'payment_status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

<<<<<<< HEAD
=======
    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProviders::class);
    }

    public function appointment()
    {
        return $this->hasOne(Appointment::class);
    }

>>>>>>> 91006da72eb6664cb35fecf3231cb7b0c67ab617
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProviders::class);
    }

    public function serviceDetail()
    {
        return $this->belongsTo(ServiceDetails::class);
    }
}
