<?php

namespace App\Http\Controllers;

use App\Http\Resources\KelasResource;
use App\Models\Kelas;
use App\Models\KelasGuru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KelasController extends Controller
{
    public function getKelasByGuruID()
    {
        $user = Auth::user();

            if (!$user || $user->role_id != 2) {
                return response()->json([
                    'success' => false,
                    'message' => 'User tidak terautentikasi'
                ], 401);
            }

        $kelas = KelasGuru::where("guru_id", $user->id)->get();

        if ($kelas->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada kelas untuk guru dengan ID ' . $user->id,
                'data' => []
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data kelas ditemukan',
            'data' => KelasResource::collection($kelas),
        ], 200);
    }
}
