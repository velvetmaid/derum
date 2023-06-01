<?php

namespace App\Models;

use Conner\Likeable\Likeable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Merch extends Model
{
    use HasFactory, Likeable;

    public $timestamps = false;
    
    protected $fillable = [
        'merch_user_id',
        'merch_title',
        'merch_image',
        'merch_category',
        'merch_weight',
        'merch_origin',
        'merch_description',
        'merch_price',
        'merch_exists'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'merch_user_id');
    }
}
