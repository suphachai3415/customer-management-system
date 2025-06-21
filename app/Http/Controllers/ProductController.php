<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class ProductController extends Controller
{
    public function index(Request $request): Response
{
    $search = $request->input('search');
    $products = Product::query()
        ->when($search, fn($q) => $q->where('name', 'like', "%$search%"))
        ->paginate(10);

    return Inertia::render('Products/Index', [
        'products' => $products,
        'search' => $search
    ]);
}

public function create(): Response
{
    return Inertia::render('Products/Create');
}

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
    ]);

    Product::create($validated);

    return redirect()->route('products.index')->with('success', 'เพิ่มสินค้าเรียบร้อย');
}

public function edit(Product $product): Response
{
    return Inertia::render('Products/Edit', [
        'product' => $product
    ]);
}

public function update(Request $request, Product $product)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
    ]);

    $product->update($validated);

    return redirect()->route('products.index')->with('success', 'อัปเดตสินค้าเรียบร้อย');
}

public function destroy(Product $product)
{
    $product->delete();
    return redirect()->route('products.index')->with('success', 'ลบสินค้าเรียบร้อย');
}

}
