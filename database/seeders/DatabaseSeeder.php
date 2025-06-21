<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use App\Models\Product;
use App\Models\PurchaseHistory;
use App\Models\PurchaseItem;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
{
    DB::statement("INSERT INTO customers (name, email, phone, created_at, updated_at) VALUES ('Nia', 'nia@example.com', '0812345678', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
    
    DB::statement("INSERT INTO products (name, price, stock, created_at, updated_at) VALUES ('Laptop', 20000.00, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");

    DB::statement("INSERT INTO purchase_histories (customer_id, purchased_at, created_at, updated_at) VALUES (1, '2025-06-21 10:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");

    DB::statement("INSERT INTO purchase_items (purchase_history_id, product_id, quantity, price, created_at, updated_at) VALUES (1, 1, 2, 20000.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
}
}
