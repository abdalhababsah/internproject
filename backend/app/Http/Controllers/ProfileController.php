<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\FriendRequestController;

class ProfileController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
        $profile=User::find($id);
        if($profile->privacy_setting=='Public'){
            $post=$profile->posts;
            
            return response()->json($post);
            // return response()->json([

            // ])
        }else if($profile->privacy_setting=='Private'&& $request->has('user_id')){
            $user=User::find($request->user_id);
            $friends = $user->getFriends()->pluck('user_id')->toArray();
            if(in_array($id,$friends)){
            // $friend=index($user->id);
            return response()->json($friends);}else{return response()->json("not");}

        }else{
            return response()->json($profile);

        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
