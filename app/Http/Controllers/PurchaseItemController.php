<?php

namespace App\Http\Controllers;

use App\Models\PurchaseItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseItemController extends Controller
{
   public function index()
{
    $histories = PurchaseItem::with([
        'product',
        'purchaseHistory.customer',
    ])->get();

    return Inertia::render('PurchaseHistory/Index', [
        'histories' => $histories,
    ]);
}
}

