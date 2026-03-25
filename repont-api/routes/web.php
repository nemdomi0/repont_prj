<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

// LEADERBOARD
Route::get('/leaderboard', function (Request $req) {
    $machine = $req->query('machine');
    $start = $req->query('start');
    $end = $req->query('end');

    $query = DB::table('recycling as r')
        ->join('products as p', 'r.product', '=', 'p.id')
        ->join('machines as m', 'r.machine', '=', 'm.id');

    if ($machine) {
        $query->where('m.id', $machine);
    }

    if ($start && $end) {
        $query->whereBetween('r.event_time', [$start, $end]);
    }

    return $query
        ->select('p.id', 'p.product_name', DB::raw('COUNT(*) as count'))
        ->groupBy('p.id', 'p.product_name')
        ->orderByDesc('count')
        ->get();
});


// EVENTS
Route::get('/events', function (Request $req) {
    $product = $req->query('product');
    $machine = $req->query('machine');
    $start = $req->query('start');
    $end = $req->query('end');

    $query = DB::table('recycling as r')
        ->join('products as p', 'r.product', '=', 'p.id')
        ->join('machines as m', 'r.machine', '=', 'm.id')
        ->where('r.product', $product);

    if ($machine) {
        $query->where('m.id', $machine);
    }

    if ($start) {
        $query->where('r.event_time', '>=', $start);
    }

    if ($end) {
        $query->where('r.event_time', '<=', $end);
    }

    return $query
        ->select(
            'p.product_name',
            'r.event_type',
            'r.event_time',
            'm.machine_name'
        )
        ->orderByDesc('r.event_time')
        ->get();
});


// MACHINES
Route::get('/machines', function () {
    return DB::table('machines')->get();
});