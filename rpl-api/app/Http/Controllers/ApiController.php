<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login User",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password"},
     *             @OA\Property(property="name", type="string", format="name", example="Dewa Permana"),
     *             @OA\Property(property="email", type="string", format="email", example="dewapermana@mail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login success",
     *         @OA\JsonContent(
     *             @OA\Property(property="token", type="string", example="1|sometoken"),
     *             @OA\Property(property="user", type="object"),
     *             @OA\Property(property="message", type="string", example="Selamat Datang User")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid Credentials"
     *     )
     * )
     */

    public function login(Request $req)
    {
        $req->validate([
            'email' => 'required | email',
            'password' => 'required',
        ]);

        $user = User::where('email', $req->email)->first();
        if (!$user || !Hash::check($req->password, $user->password) || $user->status_id == 0) {
            return Controller::json([
                'message' => 'Invalid Credentials'
            ], 401);
        }
        Auth::login($user);

        $req->session()->regenerate();
        return Controller::json([
            'user' => $user,
            'authenticate' => true,
            'message' => "Selamat Datang " . $user->name
        ]);
    }


    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Logout User",
     *     description="Logout user dengan menghapus token Sanctum yang aktif",
     *     tags={"Auth"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Logout berhasil",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Logout Success")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized (Token tidak valid atau tidak dikirim)"
     *     )
     * )
     */

    public function logout(Request $req)
    {
        Auth::guard('web')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();
        return Controller::message([
            'message' => 'Logout Success'
        ]);
    }

    public function user(Request $req)
    {
        return response()->json([
            'user' => $req->user(),
            'authenticated' => Auth::check()
        ]);
    }
}
