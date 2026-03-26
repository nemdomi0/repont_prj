<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


//   LOGIN (public)
Route::post('/api/login', function (Request $req) {
    if (Auth::attempt([
        'email' => $req->email,
        'password' => $req->password
    ])) {
        return response()->json(['success' => true]);
    }

    return response()->json(['success' => false], 401);
});


//     PROTECTED ROUTES
Route::middleware('auth')->group(function () {

    //  LEADERBOARD
    Route::get('/api/leaderboard', function (Request $req) {
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


    //  EVENTS
    Route::get('/api/events', function (Request $req) {
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


    //MACHINES
    Route::get('/api/machines', function () {
        return DB::table('machines')->get();
    });

});