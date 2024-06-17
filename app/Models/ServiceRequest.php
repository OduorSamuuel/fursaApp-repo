<?php

namespace App\Models;

use App\Models\ServiceProvider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_provider_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProviders::class);
    }

    public function appointment()
    {
        return $this->hasOne(Appointment::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function serviceBooking()
    {
        return $this->hasOne(ServiceBooking::class);
    }
}
