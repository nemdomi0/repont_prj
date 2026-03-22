<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/leaderboard', function () {
    return DB::table('recycling as r')
        ->join('products as p', 'r.product', '=', 'p.id')
        ->join('machines as m', 'r.machine', '=', 'm.id')
        ->select('p.product_name', DB::raw('COUNT(*) as count'))
        ->groupBy('p.product_name')
        ->orderByDesc('count')
        ->get();
});