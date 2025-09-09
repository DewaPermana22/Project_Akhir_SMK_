<?php

namespace App\Http\Controllers;

use App\Models\NewsLikeModel;
use Illuminate\Http\Request;

class LikeBeritaController extends Controller
{

    /**
     * @OA\Post(
     *     path="/like-post",
     *     summary="Like atau Unlike berita",
     *     description="Endpoint ini digunakan untuk memberikan like pada berita atau menghapus like jika sebelumnya sudah dilike. Like ini tidak butuh login, hanya menggunakan token unik per device.",
     *     operationId="toggleLike",
     *     tags={"News Like"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"news_id","like_token"},
     *             @OA\Property(property="news_id", type="integer", example=12, description="ID berita"),
     *             @OA\Property(property="like_token", type="string", example="abc123xyz", description="Token unik yang merepresentasikan device/user anonim"),
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Like/unlike berhasil",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="News liked successfully.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Request tidak valid",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You have already liked this news.")
     *         )
     *     )
     * )
     */


    public function toggleLike(Request $request, $news_id)
    {
        $request->validate([
            'like_token' => 'required|string',
        ]);

        $token = $request->input('like_token');

        // sudah pernah like?
        $existingLike = NewsLikeModel::where('news_id', $news_id)
            ->where('like_token', $token)
            ->first();

        if ($existingLike) {
            // kalau sudah unlike
            $existingLike->delete();
            return Controller::message(['message' => 'News unliked successfully.']);
        }

        $like = new NewsLikeModel();
        $like->news_id = $news_id;
        $like->like_token = $token;
        $like->save();

        return Controller::message(['message' => 'News liked successfully.']);
    }

    public function hasLiked(Request $request, $newsId)
    {
        $request->validate([
            'like_token' => 'required|string',
        ]);

        $liked = NewsLikeModel::where('news_id', $newsId)
            ->where('like_token', $request->like_token)->exists();

        return Controller::message([
            'liked' => $liked,
        ]);
    }
}
