<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

// ถ้าอยากล็อกอินก่อนใช้ ให้อยู่ในกลุ่ม auth:sanctum หรือ auth:api
// Route::middleware('auth:sanctum')->group(function () {
    Route::get('/customers/autocomplete', [CustomerController::class, 'autocomplete'])
         ->name('customers.autocomplete');
// });