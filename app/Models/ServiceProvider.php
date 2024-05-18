<?php
// app/Models/ServiceProvider.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProvider extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'service_type',
        'contact_number',
        'address',
        'is_approved',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
