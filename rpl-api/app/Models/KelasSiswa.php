<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KelasSiswa extends Model
{
    protected $table = "kelas_siswa";
    protected $fillable = ["siswa_id", "kelas_id"];

    public function siswa(){
        return $this->belongsTo(User::class, "siswa_id");
    }

    public function kelas(){
        return $this->belongsTo(Kelas::class, "kelas_id");
    }
}
