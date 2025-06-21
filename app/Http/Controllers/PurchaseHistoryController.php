<?php

namespace App\Http\Controllers;

use App\Models\PurchaseHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;



class PurchaseHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
// app/Http/Controllers/PurchaseHistoryController.php

public function index($id)
{
    $customer = Customer::findOrFail($id);

    $purchases = $customer->purchases()
        ->with('items.product') // <<< สำคัญมาก
        ->latest()
        ->get();

    return Inertia::render('Customers/PurchaseHistory', [
        'customer' => $customer,
        'purchases' => $purchases,
    ]);
}



  public function all()
{
    $histories = PurchaseHistory::with(['customer', 'product'])
        ->latest()
        ->get();

    return Inertia::render('PurchaseHistory/Index', [
        'histories' => $histories,
    ]);
}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PurchaseHistory $purchaseHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PurchaseHistory $purchaseHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PurchaseHistory $purchaseHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchaseHistory $purchaseHistory)
    {
        //
    }
}
