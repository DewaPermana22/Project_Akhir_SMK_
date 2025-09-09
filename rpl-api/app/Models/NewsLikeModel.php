<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsLikeModel extends Model
{
    protected $table = 'news_likes';
    protected $fillable = ['news_id', 'user_id'];

    public function berita()
    {
        return $this->belongsTo(ModelBerita::class, 'news_id');
    }

}
