<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Admin;
use App\Models\ServiceProvider;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Mail\SendOtp;
use Illuminate\Support\Facades\DB;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the OTP verification page.
     */
    public function showOtpVerificationPage($userId)
    {
        return Inertia::render('Auth/OtpVerification', ['userId' => $userId]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

       
        if ($user->is_admin) {
            $admin = Admin::where('user_id', $user->id)->first();
            if ($admin) {
             
                $otp = $this->generateAndSaveOtp($user->id, $user->email);
              
                return Redirect::route('otp.verification', ['userId' => $user->id]);
            }
        }

     
        return Redirect::intended(RouteServiceProvider::HOME);
    }

    /**
     * Verify OTP for admin users.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'userId' => 'required',
            'otp' => 'required',
        ]);
    
        $userId = $request->userId;
        $enteredOtp = $request->otp;
    
        $savedOtpHash = DB::table('users')->where('id', $userId)->value('otp');
    
        if ($savedOtpHash && Hash::check($enteredOtp, $savedOtpHash)) {
            DB::table('users')->where('id', $userId)->update(['otp' => null]);
            Auth::loginUsingId($userId);
    
            $user = Auth::user();
    
            if ($user->is_admin) {
                $admin = Admin::where('user_id', $user->id)->first();
                if ($admin) {
                    if ($admin->title === 'serviceprovider_admin') {
                        session(['otp_verified' => 'serviceprovider_admin']);
                        return response()->json(['success' => 'serviceprovider_admin']);
                    } elseif ($admin->title === 'general_admin') {
                        session(['otp_verified' => 'general_admin']);
                        return response()->json(['success' => 'general_admin']);
                    }
                }
            }
        }
    
        return response()->json(['error' => 'Invalid OTP'], 400);
    }
    
    
    /**
     * Generate OTP and send it via email.
     */
    protected function generateAndSaveOtp($userId, $email)
    {
        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception('Invalid email address.');
        }

        $otp = rand(100000, 999999);
        Mail::to($email)->send(new SendOtp($otp));

        // Save OTP hash in user table
        DB::table('users')->where('id', $userId)->update(['otp' => bcrypt($otp)]);

        return $otp;
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->user()->update([
            'last_seen_at' => now(),
        ]);

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
 public function lockScreen(Request $request)
{
    $request->session()->put('screen_locked', true);
    return Redirect::route('admin.locked');
}
public function unlockScreen(Request $request)
{
    // Get the currently authenticated user
    $user = Auth::user();

    // Get the password entered by the user
    $password = $request->input('password');

    // Compare the password entered by the user with the password stored in the database
    if (Hash::check($password, $user->password)) {
        // If passwords match, remove the screen_locked session
        $request->session()->forget('screen_locked');

        // Check if the user is a service provider admin or a general admin
        if ($user->is_admin) {
            $admin = Admin::where('user_id', $user->id)->first();
            if ($admin) {
                if ($admin->title === 'serviceprovider_admin') {
                   
                    return response()->json(['success' => 'serviceprovider_admin']);
                } elseif ($admin->title === 'general_admin') {
                   
                    return response()->json(['success' => 'general_admin']);
                }
            }
        }


        return response()->json(['success' => 'default']);
    }

   
    return response()->json(['error' => 'Invalid password'], 422);
}




}
