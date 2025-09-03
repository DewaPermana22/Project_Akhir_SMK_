<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\KategoriBeritaController;
use App\Http\Controllers\PingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

// Ping Pong Route
Route::get('api/ping', PingController::class);
