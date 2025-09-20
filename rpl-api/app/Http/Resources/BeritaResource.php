<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BeritaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul' => $this->judul,
            'slug' => $this->slug,
            'isi' => $this->when($request->routeIs('news.detail'), $this->isi),
            'excerpt' => $this->when(!$request->routeIs('news.detail'), 
                \Illuminate\Support\Str::limit(strip_tags($this->isi), 150)),
            'kategori' => $this->kategori->kategori ?? 'Tidak ada kategori',
            'kategori_id' => $this->kategori_id,
            'author' => $this->user->name ?? 'Tidak Ada User Name',
            'author_id' => $this->user_id,
            'views' => $this->views,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
            'gambar' => $this->gambar,
            'gambar_url' => $this->gambar ? asset('storage/berita/' . $this->gambar) : null,
        ];
    }
}
