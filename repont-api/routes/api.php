<?php

use Illuminate\Support\Facades\Route;

// Keep empty or minimal
Route::get('/test', function () {
    return response()->json(['status' => 'api working']);
});