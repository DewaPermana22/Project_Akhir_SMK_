<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Pengumuman;
use App\Models\KategoriPengumuman;
use App\Http\Resources\PengumumanResource;
use App\Http\Resources\KategoriPengumumanResource;

class PengumumanController extends Controller
{
    public function GetPengumuman(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. User not authenticated.',
                'data' => []
            ], 401);
        }

        try {
            $query = Pengumuman::with(['kategori_pengumuman', 'user']);

            // Filter berdasarkan kategori
            if ($request->has('kategori_id') && $request->kategori_id != 'all') {
                $query->where('kategori_id', $request->kategori_id);
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 10);
            $pengumuman = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Data pengumuman berhasil diambil',
                'data' => PengumumanResource::collection($pengumuman),
                'meta' => [
                    'current_page' => $pengumuman->currentPage(),
                    'per_page' => $pengumuman->perPage(),
                    'total' => $pengumuman->total(),
                    'total_pages' => $pengumuman->lastPage(),
                ],
                'filters' => [
                    'kategori_options' => KategoriPengumumanResource::collection(KategoriPengumuman::all())
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server: ' . $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    public function GetDetailPengumuman($id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
                'data' => []
            ], 401);
        }

        try {
            $pengumuman = Pengumuman::with(['kategori_pengumuman', 'user'])
                ->find($id);

            if (!$pengumuman) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pengumuman tidak ditemukan',
                    'data' => []
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Detail pengumuman berhasil diambil',
                'data' => new PengumumanResource($pengumuman)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'data' => []
            ], 500);
        }
    }

    public function CreatePengumuman(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
                'data' => []
            ], 401);
        }

        try {
            $validated = $request->validate([
                'judul_pengumuman' => 'required|string|max:255',
                'kategori_id' => 'required|exists:kategori_pengumuman,id',
                'isi_pengumuman' => 'required|string',
                'prioritas' => 'nullable|in:tinggi,sedang,rendah',
                'pinned' => 'nullable|boolean'
            ]);

            $pengumuman = Pengumuman::create([
                'judul_pengumuman' => $validated['judul_pengumuman'],
                'kategori_id' => $validated['kategori_id'],
                'isi_pengumuman' => $validated['isi_pengumuman'],
                'prioritas' => $validated['prioritas'] ?? 'sedang',
                'pinned' => $validated['pinned'] ?? false,
                'user_id' => $user->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pengumuman berhasil dibuat',
                'data' => new PengumumanResource($pengumuman->load(['kategori_pengumuman', 'user']))
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
                'data' => []
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server: ' . $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    public function getKategoriOptions()
    {
        try {
            $kategori = KategoriPengumuman::all();

            return response()->json([
                'success' => true,
                'message' => 'Data kategori berhasil diambil',
                'data' => KategoriPengumumanResource::collection($kategori)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'data' => []
            ], 500);
        }
    }
}
