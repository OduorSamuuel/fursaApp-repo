<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\VerificationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ChatController;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestEmailController;
use App\Http\Controllers\ServiceProviderController;
use App\Models\Chat;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MpesaController;


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


Route::get('/', [ServiceController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'user.last.seen.at'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

   Route::get('/accounts/messages', [\App\Http\Controllers\ChatController::class, 'index'])->name('chat.index');
    Route::get('/accounts/messages/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'show'])->name('chat.show');
    Route::post('/accounts/messages/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'chat'])->name('chat.store');

    Route::delete('/accounts/messages/{chat}', [\App\Http\Controllers\ChatController::class, 'destroy'])->name('chat.destroy');
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
Route::get('/provider', function () {
    return Inertia::render('Auth/RegisterServiceProvider');
});

Route::get('/choice', function () {
    return Inertia::render('RegistrationChoice');
});
// Routes for service provider admin
// Routes for service provider admin
Route::middleware(['role:serviceprovider_admin', 'admin.otp', 'ensure.screen.unlocked'])->group(function () {
    Route::get('/service/dashboard', function () {
        return Inertia::render('Admin/ServiceProvider');
    })->name('service_admin');
});
Route::get('/admin/services', [ServiceController::class, 'services'])->name('admin.services');
Route::put('/admin/services/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
// Routes for general admin
Route::middleware(['role:general_admin', 'admin.otp', 'ensure.screen.unlocked'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Admin');
    })->name('gen_admin');
});



Route::get('/register', function () {
    return Inertia::render('Auth/RegisterClient');
})->name('register.client');
Route::get('/verify-my-email', function () {
    return Inertia::render('Auth/VerifyEmail');
});

Route::get('auth/google',[GoogleAuthController::class, 'redirect'])->name('google-auth');
Route::get('auth/google/call-back',[GoogleAuthController::class, 'callback']);
Route::get('/verify', function () {
    return view('verification');

})->name('success');
Route::get('/verification/{token}', [VerificationController::class, 'verify'])->name('verification');

Route::post('/verify-otp', [AuthenticatedSessionController::class, 'verifyOtp'])->name('verify.otp');
Route::get('/otp-verification/{userId}', [AuthenticatedSessionController::class, 'showOtpVerificationPage'])
    ->name('otp.verification');

Route::post('/otp-verification', [AuthenticatedSessionController::class, 'verifyOtp'])->name('otp-verification');

Route::post('/unlock-screen', [AuthenticatedSessionController::class, 'unlockScreen'])->name('unlock.screen');
Route::get('/admin/lock-screen', [AuthenticatedSessionController::class, 'lockScreen'])->name('lock-screen');

// Then, define the route for the locked screen view
Route::get('/admin/locked', function () {
    return Inertia::render('Admin/LockedScreenOverlay');
})->name('admin.locked');

Route::get('/page-error/{fakeUrl}', function () {
    return Inertia::render('Errors/NotFound');
})->name('error');

Route::get('/test-email', [TestEmailController::class, 'index'])->name('test-email');
Route::post('/send-test-email', [TestEmailController::class, 'send']);

Route::get('/accounts', [UserController::class, 'show'])->name('accounts');
//Route::get('/accounts/appointments', [UserController::class, 'appointments'])->name('appointments.index');


Route::put('/accounts/update', [UserController::class, 'update'])->name('accounts.update');

Route::get('/account-details', [UserController::class, 'show'])->name('account.details');
Route::get('/admin/account-details', [UserController::class, 'profiledetails'])->name('account.details');
Route::get('/chat/index', [ChatController::class, 'index'])->name('chat.index');
Route::get('/users', [UserController::class, 'index']);
Route::get('/service/dashboard', [ServiceController::class, 'dashboard'])->name('service.dashboard');
Route::get('/service/services', [ServiceController::class, 'services'])->name('service.services');

Route::get('/service/clients', [ServiceController::class, 'clients'])->name('admin.clients');
Route::get('/service/settings', [ServiceController::class, 'settings'])->name('service.settings');
Route::get('/counties', [ServiceProviderController::class, 'getCounties'])->name('counties');
Route::get('/categories', [ServiceProviderController::class, 'getCategories'])->name('categories');
Route::get('/services/{category}', [ServiceProviderController::class, 'getServicesByCategory'])->name('services.byCategory');
Route::put('/admin/services/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
Route::post('admin/services/{id}/updateadditional', [ServiceController::class, 'updateAdditional'])->name('admin.services.updateadditional');
Route::get('/description/{id}', [ServiceController::class, 'getDescription'])->name('description');
    
Route::post('/confirm-booking', [BookingController::class, 'confirmBooking'])->name('confirm-booking');
Route::get('/order-confirmation', [BookingController::class, 'getBookingData'])->name('order-confirmation');
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::get('/accounts/appointments', [AppointmentController::class, 'index'])->name('appointments.index');


    Route::post('/perform-stk-push', [MpesaController::class, 'performStkPush'])->name('perform-stk-push');
   
    Route::get('/querystk-push', [MpesaController::class, 'queryStkPush'])->name('query.stk.push');

Route::get('/test',function(){
    return Inertia::render('Test');
});


require __DIR__.'/auth.php';

