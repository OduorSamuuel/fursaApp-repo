<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_providers_id',
        'rating',
        'comment',
    ];

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProviders::class, 'service_providers_id');
    }
    
}
