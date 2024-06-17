<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingTiers extends Model
{
    protected $fillable = [
        'service_detail_id',
        'name',
        'price',
        'description',
    ];

    public function serviceDetail()
    {
        return $this->belongsTo(ServiceDetails::class, 'service_detail_id');
    }
    
}
