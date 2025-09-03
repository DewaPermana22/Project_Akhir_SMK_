<?php

namespace App\Http\Controllers;

use App\Models\ModelKategoriBerita;
use Illuminate\Http\Request;

class KategoriBeritaController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/kategori-berita",
     *     summary="Tambah Kategori Berita",
     *     tags={"KategoriBerita"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"kategori"},
     *             @OA\Property(property="kategori", type="string", example="Teknologi")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Kategori berhasil ditambahkan",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Kategori Berita Berhasil Ditambahkan")
     *         )
     *     )
     * )
     */
    public function AddKategoriBerita(Request $req){
        $req->validate([
            'kategori' => 'required',
        ]);

        ModelKategoriBerita::create([
            'kategori' => $req->kategori,
        ]);

        return response()->json([
            'message' => 'Kategori Berita Berhasil Ditambahkan'
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/kategori-berita",
     *     summary="Ambil semua kategori berita",
     *     tags={"KategoriBerita"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Sukses mengambil data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Sukses mengambil data"),
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="kategori", type="string", example="Teknologi")
     *             ))
     *         )
     *     )
     * )
     */
    public function GetKategoriBerita(){
        $data = ModelKategoriBerita::all();
        return response()->json([
            'data' => $data,
            'message' => 'Sukses mengambil data'
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/kategori-berita/{id}",
     *     summary="Update kategori berita",
     *     tags={"KategoriBerita"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         description="ID kategori berita"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"kategori"},
     *             @OA\Property(property="kategori", type="string", example="Politik")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Kategori berhasil diperbarui",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Kategori Berita berhasil diperbarui"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="kategori", type="string", example="Politik")
     *             )
     *         )
     *     )
     * )
     */
    public function update(Request $request, ModelKategoriBerita $kategoriBerita)
    {
        $kategoriBerita->update([
            'kategori' => $request->kategori,
        ]);

        return response()->json([
            'message' => 'Kategori Berita berhasil diperbarui',
            'data' => $kategoriBerita
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/kategori-berita/{id}",
     *     summary="Hapus kategori berita",
     *     tags={"KategoriBerita"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         description="ID kategori berita"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Kategori berhasil dihapus",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Kategori Berita berhasil dihapus")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Kategori tidak ditemukan"
     *     )
     * )
     */
    public function DeleteKategoriBerita(ModelKategoriBerita $kategoriBerita)
    {
        $kategoriBerita->delete();

        return response()->json([
            'message' => 'Kategori Berita berhasil dihapus'
        ], 200);
    }
}
