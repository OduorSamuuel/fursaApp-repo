<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProviders extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'service_type',
        'contact_number',
        'address',
        'service_image',
        'is_approved',
        'county_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function county()
    {
        return $this->belongsTo(County::class);
    }

    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class);
    }

    public function serviceBookings()
    {
        return $this->hasMany(ServiceBooking::class);
    }

    public function serviceDetails()
    {
        return $this->hasOne(ServiceDetails::class, 'service_provider_id');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
