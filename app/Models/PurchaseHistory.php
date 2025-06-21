<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Product;
use App\Models\Customer;
use App\Models\PurchaseItem;


class PurchaseHistory extends Model
{
    use HasFactory;
    protected $fillable = ['customer_id', 'product_id', 'quantity', 'total_price', 'purchased_at'];
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // ความสัมพันธ์กับตาราง items
    public function items()
    {
        return $this->hasMany(PurchaseItem::class, 'purchase_history_id');
    }
}
