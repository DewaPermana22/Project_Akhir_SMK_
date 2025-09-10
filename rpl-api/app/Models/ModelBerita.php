<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ModelBerita extends Model
{
    protected $table = 'berita';
    protected $fillable = ['judul', 'slug', 'isi', 'kategori_id', 'user_id', 'gambar'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($berita) {
            $berita->slug = Str::slug($berita->judul) . '-' . Str::random(6);
        });

        static::updating(function ($berita) {
            if ($berita->isDirty('judul')) {
                $berita->slug = Str::slug($berita->judul) . '-' . Str::random(6);
            }
        });
    }

    public function kategori()
    {
        return $this->belongsTo(ModelKategoriBerita::class, 'kategori_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function getGambarUrlAtribute()
    {
        return asset('storage/berita' . $this->gambar);
    }
}
