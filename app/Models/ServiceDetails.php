<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 

class ServiceDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_provider_id',
        'service_description',
        'availability',
 
        // Add more columns as needed
    ];

    // Define the relationship with service providers
    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class);
    }

    // Define the one-to-many relationship with images
    public function images()
    {
        return $this->hasMany(Image::class);
    }
    public function pricingTiers()
    {
        return $this->hasMany(PricingTiers::class, 'service_detail_id'); // Correct the foreign key name here
    }
}
