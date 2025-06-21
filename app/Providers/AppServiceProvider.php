<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
  

public function boot()
{
    if (app()->environment('local') && !Auth::check()) {
        if (Schema::hasTable('users')) {
            $manager = \App\Models\User::where('role', 'manager')->first();
            if ($manager) {
                Auth::setUser($manager);
            }
        }
    }
}

}
