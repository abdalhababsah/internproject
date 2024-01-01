<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'name',
        'username',
        'email',
        'password_hash',
        'profile_image_url',
        'cover_image_url',
        'bio',
        'privacy_setting',
        'role_id',
        'birth_date',
    ];


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }

    public function sentFriendRequests()
    {
        return $this->hasMany(Friend_Request::class, 'sender_id');
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(Friend_Request::class, 'receiver_id');
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'reported_by_id');
    }
    public function friends()
    {
        // Assuming the FriendRequest model has 'sender_id' and 'receiver_id' and a 'status' field
        return $this->belongsToMany(User::class, 'friend_requests', 'sender_id', 'receiver_id')->wherePivot('status', 'Accepted');
                        
    }
    public function friend2(){
        return $this->belongsToMany(User::class, 'friend_requests', 'receiver_id', 'sender_id')
                                   ->wherePivot('status', 'Accepted');
    }
    // public function friends()
    // {
    //     // Assuming the FriendRequest model has 'sender_id' and 'receiver_id' and a 'status' field
    //     $sender_friends = $this->belongsToMany(User::class, 'friend_requests', 'sender_id', 'receiver_id')->wherePivot('status', 'Accepted');
    //     $receiver_friends = $this->belongsToMany(User::class, 'friend_requests', 'receiver_id', 'sender_id')->wherePivot('status', 'Accepted');
    //     $all_friends = $sender_friends->merge($receiver_friends);
    //     return $all_friends;
    // }
}
