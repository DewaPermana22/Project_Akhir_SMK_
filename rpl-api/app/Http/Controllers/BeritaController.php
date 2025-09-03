<?php

namespace App\Http\Controllers;

use App\Models\ModelBerita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/news/latest",
     *     summary="Get 8 berita terbaru",
     *     tags={"Berita"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="judul", type="string", example="Judul Berita Terbaru"),
     *                 @OA\Property(property="slug", type="string", example="judul-berita-terbaru_abc123"),
     *                 @OA\Property(property="gambar", type="string", example="filename.jpg"),
     *                 @OA\Property(property="gambar_url", type="string", example="http://localhost/storage/berita/filename.jpg"),
     *                 @OA\Property(property="kategori_berita", type="object")
     *             ))
     *         )
     *     )
     * )
     */

    public function GetBeritaTerbaru()
    {
        $beritaTerbaru = ModelBerita::with('kategori')
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get()
            ->map(function ($berita) {
                $berita->gambar_url = asset('storage/berita/' . $berita->gambar);
                return $berita;
            });

        return Controller::json([
            'success' => true,
            'data' => $beritaTerbaru
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/news/all",
     *     summary="Get semua berita",
     *     tags={"Berita"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="judul", type="string", example="Judul Berita"),
     *                 @OA\Property(property="slug", type="string", example="judul-berita_abc123"),
     *                 @OA\Property(property="gambar", type="string", example="filename.jpg"),
     *                 @OA\Property(property="gambar_url", type="string", example="http://localhost/storage/berita/filename.jpg"),
     *                 @OA\Property(property="kategori_berita", type="object")
     *             ))
     *         )
     *     )
     * )
     */

    public function GetSemuaBerita()
    {
        $semuaBerita = ModelBerita::with('kategori')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($berita) {
                // Tambahkan URL gambar secara dinamis
                $berita->gambar_url = asset('storage/berita/' . $berita->gambar);
                return $berita;
            });

        return Controller::json([
            'success' => true,
            'data' => $semuaBerita
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/news/detail/{news_id}",
     *     summary="Get detail berita by ID",
     *     tags={"Berita"},
     *     @OA\Parameter(
     *         name="news_id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="judul", type="string", example="Judul Berita"),
     *                 @OA\Property(property="slug", type="string", example="judul-berita_abc123"),
     *                 @OA\Property(property="isi", type="string", example="Konten berita lengkap..."),
     *                 @OA\Property(property="gambar", type="string", example="filename.jpg"),
     *                 @OA\Property(property="gambar_url", type="string", example="http://localhost/storage/berita/filename.jpg"),
     *                 @OA\Property(property="kategori_berita", type="object")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Berita tidak ditemukan")
     *         )
     *     )
     * )
     */

    public function GetDetailBerita($id)
    {
        $berita = ModelBerita::with('kategori')->find($id);

        if (!$berita) {
            return Controller::json([
                'success' => false,
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        $berita->gambar_url = asset('storage/berita/' . $berita->gambar);

        return Controller::json([
            'success' => true,
            'data' => $berita
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/news",
     *     summary="Create new berita",
     *     tags={"Berita"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"judul", "kategori_id", "isi", "gambar"},
     *                 @OA\Property(property="judul", type="string", maxLength=300, example="Judul Berita Baru"),
     *                 @OA\Property(property="kategori_id", type="integer", example=1),
     *                 @OA\Property(property="isi", type="string", example="Konten berita lengkap..."),
     *                 @OA\Property(property="gambar", type="string", format="binary", description="File gambar (max: 5MB)")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Created",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Berita Berhasil Diunggah!"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="judul", type="string", example="Judul Berita Baru"),
     *                 @OA\Property(property="slug", type="string", example="judul-berita-baru_abc123"),
     *                 @OA\Property(property="gambar_url", type="string", example="http://localhost/storage/berita/filename.jpg")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Gagal menambahkan berita"),
     *             @OA\Property(property="error", type="string", example="Error message")
     *         )
     *     )
     * )
     */

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

                // Simpan File Gambar
                $file->storeAs('berita', $imgName, 'public');
            }

            $userId = Auth::id();

            // Save Database
            $berita = ModelBerita::create([
                'judul' => $request->judul,
                'slug' => Str::slug($request->judul) . '_' . Str::random(6),
                'kategori_id' => $request->kategori_id,
                'isi' => $request->isi,
                'user_id' => $userId,
                'gambar' => $imgName,
            ]);

            $berita->gambar_url = asset('storage/berita/' . $imgName);

            return Controller::json([
                'success' => true,
                'message' => 'Berita Berhasil Diunggah!',
                'data' => $berita
            ], 201);
        } catch (\Throwable $th) {
            return Controller::json([
                'success' => false,
                'message' => 'Gagal menambahkan berita',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/news/edit/{news_id}",
     *     summary="Update berita",
     *     tags={"Berita"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="news_id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="judul", type="string", maxLength=255, example="Judul Berita Updated"),
     *                 @OA\Property(property="kategori_id", type="integer", example=1),
     *                 @OA\Property(property="isi", type="string", example="Konten berita updated..."),
     *                 @OA\Property(property="gambar", type="string", format="binary", description="File gambar (max: 5MB)")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Berita berhasil diupdate"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="judul", type="string", example="Judul Berita Updated"),
     *                 @OA\Property(property="gambar_url", type="string", example="http://localhost/storage/berita/newfilename.jpg")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Berita tidak ditemukan")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server Error"
     *     )
     * )
     */

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
                return Controller::json([
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

            $berita->judul = $request->judul;
            $berita->kategori_id = $request->kategori_id;
            $berita->isi = $request->isi;
            $berita->slug = Str::slug($request->judul) . '-' . Str::random(6);

            $berita->save();

            $berita->refresh();

            if ($berita->gambar) {
                $berita->gambar_url = asset('storage/berita/' . $berita->gambar);
            }

            return Controller::json([
                'success' => true,
                'message' => 'Berita berhasil diupdate',
                'data' => $berita
            ], 200);
        } catch (\Exception $e) {
            return Controller::json([
                'success' => false,
                'message' => 'Gagal mengupdate berita: ' . $e->getMessage()
            ], 500);
        }
    }



    /**
     * @OA\Delete(
     *     path="/api/news/delete/{news_id}",
     *     summary="Delete berita",
     *     tags={"Berita"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="news_id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Berita berhasil dihapus")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Berita tidak ditemukan")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Gagal menghapus berita"),
     *             @OA\Property(property="error", type="string", example="Error message")
     *         )
     *     )
     * )
     */

    public function DeleteBerita($id)
    {
        try {
            $berita = ModelBerita::find($id);

            if (!$berita) {
                return Controller::json([
                    'success' => false,
                    'message' => 'Berita tidak ditemukan'
                ], 404);
            }

            // Hapus file gambar
            if ($berita->gambar) {
                Storage::delete('public/berita/' . $berita->gambar);
            }

            $berita->delete();

            return Controller::json([
                'success' => true,
                'message' => 'Berita berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return Controller::json([
                'success' => false,
                'message' => 'Gagal menghapus berita',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/news/my-news",
     *     summary="Get all berita by logged in user with pagination and search",
     *     tags={"Berita"},
     *     security={{"cookieAuth": {}}},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="integer", default=5)
     *     ),
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="data", type="array",
     *                     @OA\Items(type="object",
     *                         @OA\Property(property="id", type="integer", example=1),
     *                         @OA\Property(property="judul", type="string", example="Judul Berita"),
     *                         @OA\Property(property="kategori", type="string", example="Teknologi"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time"),
     *                         @OA\Property(property="gambar_url", type="string")
     *                     )
     *                 ),
     *                 @OA\Property(property="first_page_url", type="string"),
     *                 @OA\Property(property="from", type="integer"),
     *                 @OA\Property(property="last_page", type="integer"),
     *                 @OA\Property(property="last_page_url", type="string"),
     *                 @OA\Property(property="links", type="array",
     *                     @OA\Items(type="object")
     *                 ),
     *                 @OA\Property(property="next_page_url", type="string"),
     *                 @OA\Property(property="path", type="string"),
     *                 @OA\Property(property="per_page", type="integer"),
     *                 @OA\Property(property="prev_page_url", type="string"),
     *                 @OA\Property(property="to", type="integer"),
     *                 @OA\Property(property="total", type="integer")
     *             )
     *         )
     *     )
     * )
     */


    public function getMyBerita(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return Controller::json([
                    'success' => false,
                    'message' => 'User tidak terautentikasi'
                ], 401);
            }

            $perPage = $request->get('per_page', 5);
            $page = $request->get('page', 1);
            $search = $request->get('search', '');

            $perPage = max(1, min(50, $perPage)); // Maksimal 1-50
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

            $berita = $query
                ->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);

            $formattedData = $berita->through(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'slug' => $item->slug,
                    'kategori' => $item->kategori->kategori ?? 'Tidak ada kategori',
                    'created_at' => $item->created_at->toISOString(),
                    'updated_at' => $item->updated_at->toISOString(),
                    'author' => $item->user->name ?? 'Tidak Ada User Name',
                    'gambar_url' => $item->gambar_url
                ];
            });

            return Controller::json([
                'success' => true,
                'data' => $formattedData,
                'search_term' => $search
            ]);
        } catch (\Throwable $th) {
            Log::error('Error getMyBerita: ' . $th->getMessage());
            return Controller::json([
                'success' => false,
                'message' => 'Gagal mengambil berita',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
