<?php

namespace App\Http\Controllers;

use App\Models\ModelBerita;
use App\Http\Resources\BeritaResource;
use App\Http\Resources\BeritaCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function GetBeritaTerbaru()
    {
        try {
            $berita = ModelBerita::with(['kategori', 'user'])
                ->orderBy('created_at', 'desc')
                ->take(8)
                ->get();

            return response()->json([
                'success' => true,
                'data' => BeritaResource::collection($berita),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil berita terbaru',
                'error' => env('APP_DEBUG') ? $th->getMessage() : null
            ], 500);
        }
    }

    public function GetSemuaBerita(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 20);
            $page = $request->get('page', 1);
            $search = $request->get('search', '');

            $perPage = max(1, min(100, $perPage));
            $page = max(1, $page);

            $query = ModelBerita::with(['kategori', 'user']);

            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('LOWER(judul) LIKE ?', ['%' . strtolower($search) . '%'])
                        ->orWhereRaw('LOWER(isi) LIKE ?', ['%' . strtolower($search) . '%'])
                        ->orWhereHas('kategori', function ($q) use ($search) {
                            $q->whereRaw('LOWER(kategori) LIKE ?', ['%' . strtolower($search) . '%']);
                        });
                });
            }

            $berita = $query->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);

            return response()->json([
                'success' => true,
                'data' => BeritaResource::collection($berita),
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil semua berita',
                'error' => env('APP_DEBUG') ? $th->getMessage() : null
            ], 500);
        }
    }

    public function GetDetailBerita($id)
    {
        try {
            $berita = ModelBerita::with(['kategori', 'user'])->find($id);

            if (!$berita) {
                return response()->json([
                    'success' => false,
                    'message' => 'Berita tidak ditemukan'
                ], 404);
            }

            $berita->increment('views');

            return response()->json([
                'success' => true,
                'data' => new BeritaResource($berita)
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil detail berita',
                'error' => env('APP_DEBUG') ? $th->getMessage() : null
            ], 500);
        }
    }

    public function PostBerita(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:300',
            'kategori_id' => 'required|exists:kategori_berita,id',
            'isi' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        try {
            if ($request->hasFile('gambar')) {
                $file = $request->file('gambar');
                $imgName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $file->storeAs('berita', $imgName, 'public');
            }

            $berita = ModelBerita::create([
                'judul' => $request->judul,
                'slug' => Str::slug($request->judul) . '_' . Str::random(6),
                'kategori_id' => $request->kategori_id,
                'isi' => $request->isi,
                'user_id' => Auth::id(),
                'gambar' => $imgName,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Berita Berhasil Diunggah!',
                'data' => new BeritaResource($berita->load(['kategori', 'user']))
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan berita',
                'error' => env('APP_DEBUG') ? $th->getMessage() : null
            ], 500);
        }
    }

    public function updateBerita(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategori_berita,id',
            'isi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        try {
            $berita = ModelBerita::find($id);

            if (!$berita) {
                return response()->json([
                    'success' => false,
                    'message' => 'Berita tidak ditemukan'
                ], 404);
            }

            if ($request->hasFile('gambar')) {
                if ($berita->gambar) {
                    Storage::delete('public/berita/' . $berita->gambar);
                }

                $file = $request->file('gambar');
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/berita', $filename);
                $berita->gambar = $filename;
            }

            $berita->update([
                'judul' => $request->judul,
                'kategori_id' => $request->kategori_id,
                'isi' => $request->isi,
                'slug' => Str::slug($request->judul) . '-' . Str::random(6),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Berita berhasil diupdate',
                'data' => new BeritaResource($berita->load(['kategori', 'user']))
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate berita',
                'error' => env('APP_DEBUG') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function DeleteBerita($id)
    {
        try {
            $berita = ModelBerita::find($id);

            if (!$berita) {
                return response()->json([
                    'success' => false,
                    'message' => 'Berita tidak ditemukan'
                ], 404);
            }

            if ($berita->gambar) {
                Storage::delete('public/berita/' . $berita->gambar);
            }

            $berita->delete();

            return response()->json([
                'success' => true,
                'message' => 'Berita berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus berita',
                'error' => env('APP_DEBUG') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function getMyBerita(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User tidak terautentikasi'
                ], 401);
            }

            $perPage = $request->get('per_page', 5);
            $page = $request->get('page', 1);
            $search = $request->get('search', '');

            $perPage = max(1, min(50, $perPage));
            $page = max(1, $page);

            $query = ModelBerita::with(['kategori', 'user'])
                ->where('user_id', $user->id);

            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('LOWER(judul) LIKE ?', ['%' . strtolower($search) . '%'])
                        ->orWhereHas('kategori', function ($q) use ($search) {
                            $q->whereRaw('LOWER(kategori) LIKE ?', ['%' . strtolower($search) . '%']);
                        });
                });
            }

            $berita = $query->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);

                return response()->json([
                    'success' => true,
                    'data' => new BeritaCollection($berita),
                ]);
        } catch (\Throwable $th) {
            Log::error('Error getMyBerita: ' . $th->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil berita',
                'error' => env('APP_DEBUG') ? $th->getMessage() : null
            ], 500);
        }
    }
}
