<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Searchable;

    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
     
        'uuid',
        'last_seen_at',
        'verification_token',
        'token_expiration_time',
        'is_verified',
        'is_admin',
        'otp',
        'otp_expires_at',
        'contact_number',
        'image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'last_seen_at' => 'datetime',
        'token_expiration_time' => 'datetime',
        'is_verified' => 'boolean',
        'is_admin' => 'boolean',
        'otp_expires_at' => 'datetime',
    ];

   

  

  
    public function serviceRequests()
{
    return $this->hasMany(ServiceRequest::class);
}

public function serviceProvider()
{
    return $this->hasOne(ServiceProvider::class);
}

    public function bookedServiceProviders()
    {
        return $this->hasManyThrough(
            ServiceProviders::class,
            ServiceRequest::class,
            'user_id',
            'id',
            'id',
            'service_provider_id'
        );
    }
   
    




  

 

   

  

   

   

   
    
    
  
    
  
    
 
    


    public function searchableAs(): string
    {
        return 'users_index';
    }

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
            'username' => $this->username,
        ];
    }

    public function receiveMessages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Chat::class, 'receiver_id', 'id')->orderByDesc('id');
    }

    public function sendMessages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Chat::class, 'sender_id', 'id')->orderByDesc('id');
    }

    public function messages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Chat::class, 'sender_id', 'id');
    }


    public function admin()
    {
        return $this->hasOne(Admin::class);
    }
    

 
}