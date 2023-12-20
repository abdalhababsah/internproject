<?php

namespace App\Http\Controllers;

use App\Models\Friend_Request;
use App\Models\User;
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
        // $pendingRequests = DB::table('friend_requests')
        //     ->join('users', 'friend_requests.sender_id', '=', 'users.user_id')
        //     ->select('friend_requests.*', 'users.name as sender_name', 'users.profile_image_url as sender_image')
        //     ->where('friend_requests.receiver_id', $userId)
        //     ->where('friend_requests.status', 'Pending')
        //     ->get();
        $pendingRequests = Friend_Request::where('receiver_id', $userId)
        ->join('users', 'friend_requests.sender_id', '=', 'users.user_id')
        ->select('users.user_id', 'users.name as sender_name', 'users.profile_image_url as sender_image','friend_requests.friend_request_id','friend_requests.status')
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

        // Check if sender and receiver IDs are the same
        if ($validatedData['sender_id'] === $validatedData['receiver_id']) {
            return response()->json(['message' => 'Sender and receiver cannot be the same']);
        }

        // Check if there is an existing pending friend request in either direction
        $existingRequest = Friend_Request::where(function ($query) use ($validatedData) {
            $query->where('sender_id', $validatedData['sender_id'])
                ->where('receiver_id', $validatedData['receiver_id'])
                ->where('status', 'Pending');
        })->orWhere(function ($query) use ($validatedData) {
            $query->where('sender_id', $validatedData['receiver_id'])
                ->where('receiver_id', $validatedData['sender_id'])
                ->where('status', 'Pending');
        })->first();

        if ($existingRequest) {
            // You may want to customize this response based on your application's requirements
            return response()->json(['message' => 'Friend request already sent']);
        }

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
    public function show($userId)
    {
        $friends = Friend_Request::where(function ($query) use ($userId) {
            $query->where('sender_id', $userId)
                ->orWhere('receiver_id', $userId);
        })
        ->pluck('sender_id', 'receiver_id')
        ->toArray();
    
      $users = User::where('user_id', '!=', $userId)
        ->whereNotIn('user_id', array_keys($friends))
        ->get(['user_id', 'name', 'profile_image_url as img']);
    
    return response()->json(['users' => $users]);
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
    public function update(Request $request, $id)
    {
        $friend_Request = Friend_Request::find($id);
        try {
            $request->validate([
                'status' => 'required|in:Pending,Accepted,Rejected'
            ]);

            $friend_Request->update(['status' => $request->status]);

            return response()->json($friend_Request);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Friend_Request $friend_Request)
    {
        //
    }
}
