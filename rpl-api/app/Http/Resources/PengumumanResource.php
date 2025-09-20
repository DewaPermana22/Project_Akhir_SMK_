<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengumumanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_pengumuman' => $this->judul_pengumuman,
            'isi_singkat' => $this->getIsiSingkat(),
            'isi_lengkap' => $this->when($request->routeIs('pengumuman.show'), $this->isi_pengumuman),
            'kategori' => new KategoriPengumumanResource($this->whenLoaded('kategori_pengumuman')),
            'penulis' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'nama' => $this->user->name,
                    'email' => $this->user->email
                ];
            }),
            'tanggal_dibuat' => $this->created_at->format('d F Y H:i'),
            'tanggal_diperbarui' => $this->updated_at->format('d F Y H:i'),
            'links' => [
                'detail' => route('pengumuman.show', $this->id),
            ]
        ];
    }

    protected function getIsiSingkat(): string
    {
        $isi = strip_tags($this->isi_pengumuman);
        if (strlen($isi) > 150) {
            return substr($isi, 0, 150) . '...';
        }
        return $isi;
    }
}