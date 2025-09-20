<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BeritaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'current_page' => $this->currentPage(),
                'per_page' => $this->perPage(),
                'total' => $this->total(),
                'total_pages' => $this->lastPage(),
                'has_next_page' => $this->hasMorePages(),
                'has_prev_page' => $this->currentPage() > 1,
                'from' => $this->firstItem(),
                'to' => $this->lastItem(),
                'search_term' => $request->get('search', ''),
            ],
            'links' => [
                'first' => $this->url(1),
                'last' => $this->url($this->lastPage()),
                'prev' => $this->previousPageUrl(),
                'next' => $this->nextPageUrl(),
            ]
        ];
    }

    /**
     * Customize the response for the resource collection.
     */
    public function withResponse($request, $response)
    {
        $response->setStatusCode(200);
    }
}