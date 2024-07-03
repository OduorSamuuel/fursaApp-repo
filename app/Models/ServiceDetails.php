<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; // Import HasMany for relationship definition

class ServiceDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_provider_id',
        'category', // Add category to fillable fields
        'service_description',
        // Add more columns as needed
    ];

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProviders::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class, 'service_detail_id');
    }

    public function pricingTiers()
    {
        return $this->hasMany(PricingTiers::class, 'service_detail_id');
    }
}
