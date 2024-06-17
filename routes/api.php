<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
<<<<<<< HEAD
use App\Http\Controllers\MpesaController;
=======
>>>>>>> cb992c00687d85ca97bf77d46806649eef2126d8

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

 Route::get('/users/search', [App\Http\Controllers\UserController::class, 'search']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
<<<<<<< HEAD
Route::post('v1/access/token', [MpesaController::class, 'generateAccessToken']);
Route::post('v1/hlab/stk/push', [MpesaController::class, 'STKPush']);
=======
>>>>>>> cb992c00687d85ca97bf77d46806649eef2126d8


