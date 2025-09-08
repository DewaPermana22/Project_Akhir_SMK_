<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users/detail/{user_id}",
     *     summary="Get User by ID",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
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
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="email", type="string", example="john@example.com"),
     *                 @OA\Property(property="role_id", type="integer", example=1),
     *                 @OA\Property(property="status_id", type="integer", example=1),
     *                 @OA\Property(property="profile_picture", type="string", example="profile.jpg"),
     *                 @OA\Property(property="profile_picture_url", type="string", example="http://localhost/storage/users/profile.jpg"),
     *                 @OA\Property(property="created_at", type="string", example="2023-01-01T00:00:00.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", example="2023-01-01T00:00:00.000000Z")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="User tidak ditemukan")
     *         )
     *     )
     * )
     */

    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return Controller::json(['message' => 'User not found'], 404);
        }

        return Controller::message(['user' => $user], 200);
    }
}
