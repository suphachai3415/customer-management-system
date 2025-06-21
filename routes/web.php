<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PurchaseHistoryController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



require __DIR__ . '/auth.php';

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/products', [ProductController::class, 'index']);

Route::get('/customers/autocomplete', [CustomerController::class, 'autocomplete']);
Route::get('/purchases', [PurchaseHistoryController::class, 'all'])->name('purchases.all');
Route::get('/purchase-history', [\App\Http\Controllers\PurchaseItemController::class, 'index'])
    ->name('purchase-history.index');


Route::prefix('customers')->group(function () {

    Route::get('export', [CustomerController::class, 'export'])->name('customers.export');
    Route::get('export/excel', [CustomerController::class, 'exportExcel'])->name('customers.export.excel');
    Route::get('export/csv', [CustomerController::class, 'exportCsv'])->name('customers.export.csv');
    Route::get('/autocomplete', [CustomerController::class, 'autocomplete']);
     Route::delete('{id}', [CustomerController::class, 'destroy'])->whereNumber('id')->name('customers.destroy');
    Route::get('/', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('create', [CustomerController::class, 'create'])->name('customers.create');
    // ต้องมีแบบนี้เป๊ะ
    Route::put('/{id}', [CustomerController::class, 'update'])->name('customers.update');

    Route::post('/', [CustomerController::class, 'store'])->name('customers.store');
    Route::get('{id}/edit', [CustomerController::class, 'edit'])->whereNumber('id')->name('customers.edit');
    Route::get('{id}/purchases', [PurchaseHistoryController::class, 'index'])->name('customers.purchases');


Route::post('delete/{id}', [CustomerController::class, 'deleteViaPost'])->name('customers.delete.viaPost');

    // ย้ายอันนี้ลงมาล่างสุด!
    Route::post('update/{id}', [CustomerController::class, 'updateViaPost'])->name('customers.update.viaPost');
    Route::get('{id}', [CustomerController::class, 'show'])->whereNumber('id')->name('customers.show');
});
