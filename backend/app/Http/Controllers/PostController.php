<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Analytic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use File;
class PostController extends Controller
{

    public function index(Request $request)
    {

        try {
      
        $id = $request->id; // Get user ID from request, or default to current user
        $friends = User::find($id)->getFriends()->pluck('user_id');

        $posts =// Cache::remember("posts.user_id.$id", -1, function () use ($id, $friends) {
            //return
             Post:://with('user:user_id,name,profile_image_url')
                // ->withCount('likes')
                whereIn('posts.user_id', $friends->prepend($id))
                ->orderBy('created_at','desc')
                ->get();
        //});
        // $posts = Post::with('user:user_id,name,profile_image_url',)
        //      ->whereIn('posts.user_id', $friends->prepend($id))
        //      ->withCount('likes')
        //      ->orderBy('created_at','desc')
        //      ->get();
             

        return response()->json([
            'posts' => $posts
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Something went wrong!',
            'error' => $e->getMessage()
        ], 500);
    }
    
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $post=Post::create($request->all());
            // return response()->json($post->);
            $a=Analytic::create([
                'post_id' => $post->post_id,
            ]);
            if ($request->hasFile('media_url')) {
                $img = $request->file('media_url');
                $extintion= $img->getClientOriginalExtension();
                $imagename =  Str::uuid().'.'.$extintion;
                $img->move(public_path('posts'), $imagename);
                $post->media_url = $imagename;
            }
            $post->update();
            return response()->json([
                // 'message' => 'Post successfully created.',
                'post'=>$post
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something wrong!'
            ], 500);
        }
    }



    /**
     * Display the specified resource.
     */

     public function show(Post $post)
     {
         $postWithUser = Post::with('user')->find($post->post_id);

         if (!$postWithUser) {
             return response()->json([
                 'message' => 'Post Not Found.'
             ], 404);
         }

         $userName = $postWithUser->user->name;

         return response()->json([
             'post' => [
                 'post_id' => $postWithUser->post_id,
                 'content' => $postWithUser->content,
                 'media_url' => $postWithUser->media_url,
                 'user_name' => $userName
             ]
         ], 200);
     }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post){
    try {
         if ($request->hasFile('media_url')) {
            $img = $request->file('media_url');
            $extintion= $img->getClientOriginalExtension();
            $imagename =  Str::uuid().'.'.$extintion;
            $img->move(public_path('posts'), $imagename);
            $old_image_path = public_path('posts/'.$post->media_url);
            if (File::exists($old_image_path)) {
                File::delete($old_image_path);
            }
            $post->media_url = $imagename;
        }
        $post->update();

        return response()->json([
            'message' => 'Post successfully updated.'
        ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!'
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        try {
            // Find the post
            $foundPost = Post::find($post->post_id);

            if (!$foundPost) {
                return response()->json([
                    'message' => 'Post Not Found.'
                ], 404);
            }

            $foundPost->comments()->delete();
            $foundPost->reports()->delete();
            $foundPost->analytics()->delete();

            $foundPost->delete();

            return response()->json([
                'message' => 'Post successfully deleted.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!'
            ], 500);
        }
    }
}
