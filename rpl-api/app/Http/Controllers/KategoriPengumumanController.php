<?php

namespace App\Http\Controllers;

use App\Models\KategoriPengumuman;
use Illuminate\Http\Request;

class KategoriPengumumanController extends Controller
{
    public function index(){
        $data = KategoriPengumuman::all();
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Sukses mengambil data'
        ], 200);
    }
}
