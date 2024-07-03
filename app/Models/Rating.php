<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_providers_id',
<<<<<<< HEAD
        'user_id',
=======
>>>>>>> 91006da72eb6664cb35fecf3231cb7b0c67ab617
        'rating',
        'comment',
    ];

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProviders::class, 'service_providers_id');
<<<<<<< HEAD
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
=======
>>>>>>> 91006da72eb6664cb35fecf3231cb7b0c67ab617
    }
    
}
