<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use File;


class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request){
        $user = User::create($request->all());
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('user'), $imagename);
            $user->profile_image_url = $imagename;
        }
        if ($request->has('password')) {
            $user->password_hash = bcrypt($request->password);
        }
        $user->update();
        return response()->json($user);
    }

    public function show($id){
        $user = User::where("user_id","=", $id)
        ->select('name','profile_image_url','bio','privacy_setting','email','birth_date')
        ->get(); 
        // $post =Post::->get();
        $post =Post::where("user_id","=", $id)
        ->orderBy("created_at","desc")
        ->get();
        return response()->json(compact('user', 'post'));
    }

    public function update(Request $request, $id){
        $user = User::findOrFail($id);
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('user'), $imagename);
            $old_image_path = public_path('user/'.$user->profile_image_url);
            if (File::exists($old_image_path)) {
                File::delete($old_image_path);
            }
            $user->profile_image_url = $imagename;
        }
        if ($request->has('password')) {
            $user->password_hash = bcrypt($request->password);
        }

        $user->update($request->all());
    }
    
    public function destroy(User $user){
        $user->delete();
        return response()->json('Deleted');
    }

}
