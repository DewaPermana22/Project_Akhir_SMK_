<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KategoriBeritaController;
use App\Http\Controllers\KategoriPengumumanController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Ping Pong Route
Route::get('/ping', [PingController::class, 'ping']);

// Public routes (tanpa auth)
Route::post('/login', [ApiController::class, 'login']);
Route::post('/news', [BeritaController::class, 'PostBerita']);

// Route get berita (User belum Login dapat akses!)
Route::get('/news/latest', [BeritaController::class, 'GetBeritaTerbaru']);
Route::get('/news/all', [BeritaController::class, 'GetSemuaBerita']);

// Kategori pengumuman
Route::get('/kategori-pengumuman', [KategoriPengumumanController::class, 'index']);

// Protected routes (perlu auth)
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    // Route Logout dan get user yang sedang login
    Route::post('/logout', [ApiController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // Route Kategori berita (untuk admin)
    Route::post('/kategori-berita', [KategoriBeritaController::class, 'AddKategoriBerita']);
    Route::get('/kategori-berita', [KategoriBeritaController::class, 'GetKategoriBerita']);
    Route::put('/kategori-berita/{kategoriBerita}', [KategoriBeritaController::class, 'update']);
    Route::delete('/kategori-berita/{kategoriBerita}', [KategoriBeritaController::class, 'DeleteKategoriBerita']);
   
    // Route Berita (untuk admin dan guru)
    Route::get('/news/my-news', [BeritaController::class, 'GetMyBerita']);
    Route::get('/news/detail/{news_id}', [BeritaController::class, 'GetDetailBerita'])
        ->name('news.detail');
    Route::post('/news/edit/{news_id}', [BeritaController::class, 'updateBerita']);
    Route::delete('/news/delete/{news_id}', [BeritaController::class, 'DeleteBerita']);
    
    Route::get('/users/detail/{user_id}', [UsersController::class, 'getUserById']);

    // Route pengumuman (untuk semua role)
    Route::get('/pengumuman', [PengumumanController::class, 'GetPengumuman']);
    Route::get('/pengumuman/{id}', [PengumumanController::class, 'GetDetailPengumuman']);    
    Route::post('/pengumuman', [PengumumanController::class, 'CreatePengumuman']);
    Route::get('/pengumuman/kategori/options', [PengumumanController::class, 'getKategoriOptions']);

    // Route Kelas
    Route::get('/classroom/i-teach', [KelasController::class, 'getKelasByGuruID']);
});