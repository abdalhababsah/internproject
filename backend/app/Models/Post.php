<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;


class Post extends Model
{
    use HasFactory;

    protected $primaryKey = 'post_id';

    protected $fillable = [
        'user_id',
        'content',
        'media_url',
    ];

     // Append custom attributes to the JSON representation of the model
     protected $appends = ['likes_count', 'user'];

     // Define the likes_count attribute
     public function getLikesCountAttribute()
     {
         // Return the count of likes for this post
         return $this->likes()->count();
     }
 
     // Define the user attribute
     public function getUserAttribute()
     {
         // Return the user who created this post
         return $this->user()->select('user_id', 'name', 'profile_image_url')->first();
     }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'post_id');
    }

    public function analytics()
    {
        return $this->hasOne(Analytic::class, 'post_id');
    }
  
    public function likes()
    {
        return $this->hasMany(Like::class,'post_id');
    }
    public static function boot()
{
    parent::boot();

    static::saved(function ($post) {
        $posts = Cache::get("posts.user_id.$post->user_id");
        if ($posts) {
            $posts->prepend($post);
            Cache::put("posts.user_id.$post->user_id", $posts, 3600);
        }
    });
}
}
