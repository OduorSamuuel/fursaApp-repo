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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
        'contact_number',  // Added contact_number
        'image',  // Added image
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'last_seen_at' => 'datetime',
        'token_expiration_time' => 'datetime',
        'is_verified' => 'boolean',
        'is_admin' => 'boolean',
        'otp_expires_at' => 'datetime',  // Added cast for OTP expiration time
    ];

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

    public function admin(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Admin::class);
    }

    public function serviceProvider(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ServiceProvider::class);
    }
    
    // Method to retrieve personal access tokens
 
    // Method to retrieve password reset tokens
  

    // Method to retrieve failed jobs
  
}
