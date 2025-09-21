<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = "kelas";
    protected $fillable = ['nama_kelas'];

    public function guruKelas()
    {
        return $this->hasMany(KelasGuru::class, 'kelas_id');
    }
    public function siswaKelas()
    {
        return $this->hasMany(KelasSiswa::class, 'kelas_id');
    }
    public function pengumuman()
    {
        return $this->belongsToMany(Pengumuman::class, 'pengumuman_kelas');
    }
}
