<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CountryCode extends Model
{
    protected $fillable = ['code', 'name', 'valid_digits'];

    // Any additional attributes or methods can be defined here
}
