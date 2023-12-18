<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;


class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users);
    }
    public function store(Request $request){
        $user = User::create($request->all());
        return response()->json($user);
    }
    public function show($id){
        $user = User::find($id);//->join("posts as p","p.user_id","=","users.user_id")->get(); 
        $post =Post::where("user_id","=", $id)->get();
        return response()->json([$user, $post]);
    }
    public function update(Request $request, $id){
        $user = User::find($id);
        $user->update($request->all());
        return response()->json($user);
    }
    public function destroy(User $user){
        $user->delete();
        return response()->json('Deleted');
    }

}
