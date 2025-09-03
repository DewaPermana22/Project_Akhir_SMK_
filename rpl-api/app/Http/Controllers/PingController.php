<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

class PingController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/ping",
     *     summary="Ping API",
     *     tags={"PingPong"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Pong"),
     *             @OA\Property(property="execution_time_ms", type="number", example=1.23)
     *         )
     *     )
     * )
     */
    public function __invoke(): JsonResponse
    {
        $start = microtime(true);

        // proses utama
        $data = ['message' => 'Pong'];

        $end = microtime(true);
        $executionTime = round(($end - $start) * 1000, 2); // in milliseconds

        return response()->json([
            'data' => $data,
            'execution_time_ms' => $executionTime
        ]);
    }
}
