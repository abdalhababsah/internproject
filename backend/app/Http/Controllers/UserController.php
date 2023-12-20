<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use File;


class UserController extends Controller
{
    public function index(Request $request){
        $query=User::query();
        if ($request->has('search')) {
            $query->where('users.name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('users.email','LIKE', '%' . $request->search . '%');
        }
        $users = $query->get();
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
        if ($request->hasFile('cover')) {
            $image = $request->file('cover');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->cover->move(public_path('user/cover'), $imagename);
            $user->cover_image_url = $imagename;
        }
        if ($request->has('password')) {
            $user->password_hash = bcrypt($request->password);
        }
        $user->update();
        return response()->json($user);
    }

    public function show($id){
        $user = User::where("user_id","=", $id)
        ->select('name','profile_image_url','cover_image_url','bio','privacy_setting','email','birth_date')
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
            if ($request->hasFile('cover')) {
                $image1 = $request->file('cover');
                $extension1 = $image1->getClientOriginalExtension();
                $imagename1 = time() . '.' . $extension1;
                $image_path = public_path('cover/' . $user->cover_image_url);
                $image1->move(public_path('cover'), $imagename1);
                if (File::exists($image_path)) {
                    File::delete($image_path);
                }
                $user->cover_image_url = $imagename1;
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
