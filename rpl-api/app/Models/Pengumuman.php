<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    protected $table = "pengumuman";
    protected $fillable = ["judul_pengumuman", "user_id", "kategori_id", "isi_pengumuman"];

    public function kategori_pengumuman()
    {
        return $this->belongsTo(KategoriPengumuman::class, 'kategori_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
