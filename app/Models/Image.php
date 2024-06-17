<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_details_id',
        'path',
    ];

    public function serviceDetail()
    {
        return $this->belongsTo(ServiceDetails::class);
    }
}
