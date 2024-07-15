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
use App\Http\Controllers\RatingController;
use App\Http\Controllers\AdminController;


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
    Route::put('/service/cancel/{id}', [BookingController::class, 'cancelService'])->name('cancel.service');
    Route::get('/booking-done',[MpesaController::class, 'processBooking'])->name('booking.store1');
    Route::get('/rating/{serviceDetailId}', [RatingController::class, 'index'])->name('ratings.index');
    Route::post('/rate-provider', [RatingController::class, 'store'])->name('ratings.store');
    Route::post('/update-payment/{id}', [MpesaController::class, 'updatePayment'])->name('update.payment');
    
    Route::post('/perform-stk-push', [MpesaController::class, 'performStkPush'])->name('perform-stk-push');
    //Route::get('/mpesa/stk/callback', [MpesaController::class, 'handleStkCallback'])->name('mpesa.stk.callback');
    Route::post('/booked', [BookingController::class, 'createBooking'])->name('booking.create');

    Route::get('/querystk-push', [MpesaController::class, 'queryStkPush'])->name('query.stk.push');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

   Route::get('/accounts/messages', [\App\Http\Controllers\ChatController::class, 'index'])->name('chat.index');
    Route::get('/accounts/messages/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'show'])->name('chat.show');
    Route::post('/accounts/messages/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'chat'])->name('chat.store');

   Route::get('/admin/chats', [\App\Http\Controllers\ChatController::class, 'index'])->name('admin.chats');
    Route::get('/admin/chats/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'show'])->name('chat.show');
    Route::post('/admin/chats/{user:uuid}', [\App\Http\Controllers\ChatController::class, 'chat'])->name('chat.store');
   Route::get('/service/chats', [\App\Http\Controllers\ChatController::class, 'index'])->name('service.chats');
    Route::get('/service/chats{user:uuid}', [\App\Http\Controllers\ChatController::class, 'show'])->name('chat.show');
    Route::post('/service/chats{user:uuid}', [\App\Http\Controllers\ChatController::class, 'chat'])->name('chat.store');

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
Route::get('/services', [ServiceController::class, 'allServices'])->name('services');
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
    Route::post('/update-status/{id}', [ServiceController::class, 'updateStatus'])->name('service-request.update-status');
    Route::get('/userdetails/{id}',[ServiceController::class, 'showUserDetails'])->name('userdetails.show');
    Route::post('/initiate-payment/{id}', [MpesaController::class, 'initiatePayment'])->name('initiate.payment');
    Route::get('/admin-querystk-push', [MpesaController::class, 'AdminQueryStkPush'])->name('admin.query.stk.push');
    
Route::get('/service/dashboard', [ServiceController::class, 'dashboard'])->name('service.dashboard');
Route::get('/service/services', [ServiceController::class, 'services'])->name('service.services');

Route::get('/service/clients', [ServiceController::class, 'clients'])->name('admin.clients');
Route::get('/service/settings', [ServiceController::class, 'settings'])->name('service.settings');
Route::get('/counties', [ServiceProviderController::class, 'getCounties'])->name('counties');
Route::get('/categories', [ServiceProviderController::class, 'getCategories'])->name('categories');
Route::get('/services/{category}', [ServiceProviderController::class, 'getServicesByCategory'])->name('services.byCategory');
Route::put('/admin/services/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
Route::post('admin/services/{id}/updateadditional', [ServiceController::class, 'updateAdditional'])->name('admin.services.updateadditional');



});
Route::get('/admin/services', [ServiceController::class, 'services'])->name('admin.services');
Route::put('/admin/services/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
// Routes for general admin
Route::middleware(['role:general_admin', 'admin.otp', 'ensure.screen.unlocked'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::post('/users/{id}/delete', [AdminController::class, 'deleteUser'])->name('users.delete');
    Route::post('/users/{id}/approve', [AdminController::class, 'approveUser'])->name('users.approve');
    Route::post('/users/{id}/assign-role', [AdminController::class, 'assignRole'])->name('users.assignRole');
    Route::post('/payprovider', [AdminController::class, 'payProvider'])->name('payments.payProvider');
    Route::put('/settings', [AdminController::class, 'updateSettings'])->name('settings.update');
    Route::delete('/admin/super/service-providers/{id}', [AdminController::class, 'destroy'])
    ->name('admin.super.service-providers.destroy');
    Route::put('/admin/superc-providers/{id}', [AdminController::class, 'update'])
    ->name('admin.super.service-providers.update');
    Route::get('/admin/customers',[AdminController::class, 'providers'])->name('providers.index');
    Route::get('/admin/payments',[AdminController::class, 'payments'])->name('admin.payments');
    Route::get('/admin/settings',[AdminController::class, 'settings'])->name('admin.settings');
    Route::get('/admin/reports',[AdminController::class, 'reports'])->name('admin.reports');


   
   ;
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
    return view('verification')->name('verify');

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


Route::post('/accounts/update', [UserController::class, 'update'])->name('accounts.update');

Route::get('/account-details', [UserController::class, 'show'])->name('account.details');
Route::get('/admin/account-details', [UserController::class, 'profiledetails'])->name('account.details');
Route::get('/chat/index', [ChatController::class, 'index'])->name('chat.index');
Route::get('/users', [UserController::class, 'index']);Route::get('/description/{id}', [ServiceController::class, 'getDescription'])->name('description');


    
Route::post('/confirm-booking', [BookingController::class, 'confirmBooking'])->name('confirm-booking');
Route::get('/order-confirmation', [BookingController::class, 'getBookingData'])->name('order-confirmation');
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::get('/accounts/appointments', [AppointmentController::class, 'index'])->name('appointments.index');




Route::get('/test',function(){
    return Inertia::render('Test');
});
Route::post('/booking',[BookingController::class, 'index'])->name('booking.store');
Route::get('/booking-confirmation', [BookingController::class, 'confirmation'])->name('booking.confirmation');
Route::post('/booking-summary', [BookingController::class, 'summary'])->name('booking.summary');
Route::get('/summary', [BookingController::class, 'viewSummary'])->name('booking.view');
Route::post('/payment', [BookingController::class, 'payment'])->name('booking.payment');
Route::get('/payment-module', [MpesaController::class, 'paymentProcess'])->name('payment.process');
Route::get('/admin/payment-module', [MpesaController::class, 'AdminPaymentProcess'])->name('admin.payment.process');




Route::get('/booking-payment',function(){
    Return Inertia::render('BookingPayment');
});
Route::post('/booking-processing',[BookingController::class, 'processPayment'])->name('booking.process');


Route::get('/booking-success',function(){
    Return Inertia::render('BookingSuccess');
});
Route::get('/accounts/transactions',function(){
    Return Inertia::render('Accounts/Transactions');
});


//Route::get('/admin/chats',[AdminController::class, 'chats'])->name('admin.chats');
 




// Delete a service provider



    Route::get('/welcome',function(){
        return view('welcome');
    });


require __DIR__.'/auth.php';

