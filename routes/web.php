<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\VerificationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'user.last.seen.at'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/chat', [\App\Http\Controllers\ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'chat'])->name('chat.store');

    Route::delete('/chat/delete/{chat}', [\App\Http\Controllers\ChatController::class, 'destroy'])->name('chat.destroy');
});
Route::get('/appointments', function () {
    return Inertia::render('appointments');
});

Route::get('/signup', function () {
    return Inertia::render('Signup');
});
Route::get('/appointments', function () {
    return Inertia::render('Appointments');
});
Route::get('/about', function () {
    return Inertia::render('About');
});
Route::get('/services', function () {
    return Inertia::render('Services');
});
Route::get('/verificationa', function () {
    return Inertia::render('Verification');
});
Route::get('auth/google',[GoogleAuthController::class, 'redirect'])->name('google-auth');
Route::get('auth/google/call-back',[GoogleAuthController::class, 'callback']);
Route::get('/verify', function () {
    return view('verification');

})->name('success');
Route::get('/verification/{token}', [VerificationController::class, 'verify'])->name('verification');


require __DIR__.'/auth.php';

