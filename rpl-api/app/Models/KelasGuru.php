<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KelasGuru extends Model
{
    protected $table = "kelas_guru";
    protected $fillable = ["guru_id", "kelas_id"];

    public function guru()
    {
        return $this->belongsTo(User::class, 'guru_id');
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }
}
