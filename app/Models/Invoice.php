<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_user_id',
        'invoice_order_id',
        'invoice_product_id',
        'invoice_product_name',
        'invoice_type_product',
        'invoice_user_name',
        'invoice_qty',
        'invoice_price',
        'invoice_total_price',
    ];
    public $timestamps = true;

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'invoice_order_id');
    }
}
