<?php

namespace App\Http\Controllers;

use App\Events\ChatBroadcast;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        
    }
    public function broadcast(Request $request)
    {
        broadcast(new ChatBroadcast ($request->message))->toOthers();
        
        return response()->json(['message'=>$request->message]);
    }
    public function receive(Request $request)
    {
        return response()->json(['message'=>$request->get('message')]);

    }
}
