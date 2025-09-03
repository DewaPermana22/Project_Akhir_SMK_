<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KategoriBeritaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::post('/login', [ApiController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [ApiController::class, 'logout']);
        Route::get('/user', [ApiController::class, 'user']);

        Route::post('/kategori-berita', [KategoriBeritaController::class, 'AddKategoriBerita']);
        Route::get('/kategori-berita', [KategoriBeritaController::class, 'GetKategoriBerita']);
        Route::put('/kategori-berita/{kategoriBerita}', [KategoriBeritaController::class, 'update']);
        Route::delete('/kategori-berita/{kategoriBerita}', [KategoriBeritaController::class, 'DeleteKategoriBerita']);

        Route::post('/news', [BeritaController::class, 'PostBerita']);
        Route::get('/news/latest', [BeritaController::class, 'GetBeritaTerbaru']);
        Route::get('/news/all', [BeritaController::class, 'GetSemuaBerita']);
        Route::get('/news/my-news', [BeritaController::class, 'GetMyBerita']);
        Route::get('/news/detail/{news_id}', [BeritaController::class, 'GetDetailBerita']);
        Route::put('/news/edit/{news_id}', [BeritaController::class, 'PutBerita']);
        Route::delete('/news/delete/{news_id}', [BeritaController::class, 'DeleteBerita']);
    });
});
