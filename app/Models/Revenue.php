<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revenue extends Model
{
    use HasFactory;

    protected $table = 'revenue';

    protected $fillable = [
        'date',
        'revenue_generated',
        'total_revenue',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
