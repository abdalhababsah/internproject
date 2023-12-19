<?php

namespace App\Http\Controllers;

use App\Models\Friend_Request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FriendRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $userId)
    {
        $friend_requests = Friend_Request::where(function ($query) use ($userId) {
            $query->where('sender_id', $userId)
                ->orWhere('receiver_id', $userId);
        })
        ->where('status', 'Accepted')
        ->with(['sender' => function ($query) {
            $query->select('user_id', 'name', 'profile_image_url as img');
        }, 'receiver' => function ($query) {
            $query->select('user_id', 'name', 'profile_image_url as img');
        }])
        ->get();
    // return response()->json($friend_requests);
    $friends = $friend_requests->map(function ($request) use ($userId) {
        return $request->sender_id == $userId ? $request->receiver : $request->sender;
    });
    
    return response()->json(['friends' => $friends]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function selectPendding(Request $request, $userId)
    {
        $pendingRequests = DB::table('friend_requests')
            ->join('users', 'friend_requests.sender_id', '=', 'users.user_id')
            ->select('friend_requests.*', 'users.name as sender_name', 'users.profile_image_url as sender_image')
            ->where('friend_requests.receiver_id', $userId)
            ->where('friend_requests.status', 'Pending')
            ->get();

        return response()->json(['pendingRequests' => $pendingRequests]);
    }

    public function sendingFriendRequest(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'sender_id' => 'required|exists:users,user_id',
            'receiver_id' => 'required|exists:users,user_id',
        ]);

        // Create a new friend request
        $friendRequest = new Friend_Request();
        $friendRequest->sender_id = $validatedData['sender_id'];
        $friendRequest->receiver_id = $validatedData['receiver_id'];
        $friendRequest->status = 'Pending'; // Set the status to default

        // Save the friend request
        $friendRequest->save();

        return response()->json(['message' => 'Friend request sent successfully']);
    }


    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(Friend_Request $friend_Request)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Friend_Request $friend_Request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Friend_Request $friend_Request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Friend_Request $friend_Request)
    {
        //
    }
}
