<?php

namespace App\Http\Controllers;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="BackEnd RPL - By Dewa Permana",
 *      description="Swagger Documentation BackEnd Web RPL - Created by Dewa Permana",
 *      @OA\Contact(
 *          email="dewaprmanaptr@gmail.com"
 *      )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Masukkan token dari login (Bearer Token)"
 * )
 */

abstract class Controller
{
    public static function json($message, $status = 200)
    {
        return  response()->json([
            'message' => $message
        ], $status);
    }
    public static function message($json = [], $status = 200)
    {
        return  response()->json($json, $status);
    }
}
