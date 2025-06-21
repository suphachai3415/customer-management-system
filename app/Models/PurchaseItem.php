<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Product;
use App\Models\PurchaseHistory;
use App\Models\Customer;




class PurchaseItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_id',
        'product_id',
        'quantity',
        'price',
    ];

    public function purchase()
    {
        return $this->belongsTo(PurchaseHistory::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function purchaseHistory()
{
    return $this->belongsTo(PurchaseHistory::class);
}



}
