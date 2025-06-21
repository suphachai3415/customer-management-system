<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('purchase_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_history_id')->constrained('purchase_histories')->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // ← ต้องมีบรรทัดนี้
            $table->integer('quantity');
            $table->decimal('price', 10, 2); // ราคาต่อหน่วย
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_items');
    }
};
