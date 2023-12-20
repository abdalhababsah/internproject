<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('post_id')) {
            // Fetch comments for the specified post
            $postId = $request->input('post_id');
            $comments = Comment::where('post_id', $postId)->get();
        } else {
            // If 'post_id' is not provided, return all comments
            $comments = Comment::all();
        }
        if ($comments->isEmpty()) {
            return response()->json(['message' => 'No comments found for this post'], 404);
        }

        return response()->json( $comments);
        // return Comment::all();

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
        //
        $comment=Comment::create($request->all());
        return response()->json($comment, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
        return response()->json($comment);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
        $comment->update($request->all());

        return response()->json($comment);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
        $comment->delete();

    return response()->json(null, 204);
    }
}
