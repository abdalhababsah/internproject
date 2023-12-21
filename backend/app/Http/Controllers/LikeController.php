<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use DB;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $like =Like::where(['user_id' => $request->user_id, 'post_id' => $request->post_id])->first();
        if ($like) {
            $like->delete();
        } else {
            $like=Like::create(['user_id' => $request->user_id, 'post_id' => $request->post_id]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $likeSum = Like::where('post_id', $id)->count();
        
        return response()->json($likeSum);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}
