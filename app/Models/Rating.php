<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_provider_id',
        'service_detail_id', // Added this line
        'user_id',
        'rating',
        'comment',
    ];

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class, 'service_provider_id');
    }

    public function serviceDetail()
    {
        return $this->belongsTo(ServiceDetails::class, 'service_detail_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}