<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_detail_id',
        'day_of_week',
        'open',
        'close',
        'closed',
    ];

    public function serviceDetail()
    {
        return $this->belongsTo(ServiceDetails::class);
    }
}
