<?php
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

// LEADERBOARD
Route::get('/leaderboard', function () {
    return DB::table('recycling as r')
        ->join('products as p', 'r.product', '=', 'p.id')
        ->join('machines as m', 'r.machine', '=', 'm.id')
        ->select('p.product_name', DB::raw('COUNT(*) as count'))
        ->groupBy('p.product_name')
        ->orderByDesc('count')
        ->get();
});

// EVENTS
Route::get('/events', function (Request $req) {
    $product = $req->query('product');

    return DB::table('recycling as r')
        ->join('products as p', 'r.product', '=', 'p.id')
        ->join('machines as m', 'r.machine', '=', 'm.id')
        ->where('p.product_name', $product)
        ->select('p.product_name', 'p.type_number', 'r.event_time', 'm.machine_name')
        ->orderByDesc('r.event_time')
        ->limit(20)
        ->get();
});

// MACHINES
Route::get('/machines', function () {
    return DB::table('machines')->get();
});