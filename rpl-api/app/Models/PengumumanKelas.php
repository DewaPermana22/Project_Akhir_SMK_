<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengumumanKelas extends Model
{
    protected $table = "pengumuman_kelas";
    protected $fillable = ["pengumuman_id", "kelas_id"];
}
