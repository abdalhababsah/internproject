<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AnalyticController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


/////////////////////////comment//////////////////////////////////////////
Route::resource('comments', CommentController::class);
////////////////////////////////////////////////////////////////////////////////////////

Route::post('/signup', [AuthController::class, 'sign_up']);
Route::post('login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class, 'logout']);
/////////////////////////Analytics///////////////////////////////////////////////////
Route::resource('analytics', AnalyticController::class);
Route::get('analytics/post/{post_id}', [AnalyticController::class, 'getAnalyticsForPost']);
Route::put('analytics/{post_id}/update-likes-comments', [AnalyticController::class, 'updateLikesAndComments']);
////////////////////////////////////////////////////////////////////////////////////////

//posts Routes
// {{
//Route to get all users
Route::get('/posts', [PostController::class, 'index']);

// Route for creating a new post
Route::post('/posts', [PostController::class, 'store']);

// Route for getting a specific post
Route::get('/posts/{post}', [PostController::class, 'show']);

// Route for updating a specific post
Route::put('/posts/{post}', [PostController::class, 'update']);

// Route for deleting a specific post
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
//  }}

// // // // // // // // // //
Route::get('/friends/{userId}', [FriendRequestController::class, 'index']);
Route::get('/pending-requests/{userId}', [FriendRequestController::class, 'selectPendding']);
Route::post('/send-friend-request', [FriendRequestController::class, 'sendingFriendRequest']);
// // // // // // // // // //




//----- Report --------/

Route::apiResource('reports', ReportController::class);
