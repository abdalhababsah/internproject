<?php
namespace App\Http\Controllers;

use App\Models\Analytic;
use Illuminate\Http\Request;

class AnalyticController extends Controller
{
    // ...

    
    public function index()
    {
        $analytics = Analytic::all();

        $totalLikes = $analytics->sum('likes_count');
        $totalComments = $analytics->sum('comments_count');

        return response()->json([
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
        ]);
    }

    public function getAnalyticsForPost($post_id)
    {
        $analytics = Analytic::where('post_id', $post_id)->get();

        $totalLikes = $analytics->sum('likes_count');
        $totalComments = $analytics->sum('comments_count');

        return response()->json([
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
        ]);
    }
    public function updateLikesAndComments(Request $request, $post_id)
    {
        $request->validate([
            'likes_count' => 'integer',
            'comments_count' => 'integer',
        ]);

        $analytics = Analytic::where('post_id', $post_id)->first();

        if (!$analytics) {
            return response()->json(['message' => 'Analytics not found for the given post_id'], 404);
        }

        $analytics->update([
            'likes_count' => $request->input('likes_count', $analytics->likes_count),
            'comments_count' => $request->input('comments_count', $analytics->comments_count),
        ]);

        return response()->json(['message' => 'Likes and comments updated successfully']);
    }


}


    



