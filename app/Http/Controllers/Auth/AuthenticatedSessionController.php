<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Admin;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\ServiceProvider;
use Inertia\Inertia;
use App\Mail\SendOtp;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
 use Illuminate\Support\Facades\Session;

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
  

     public function showOtpVerificationPage($encodedString)
     {
         $userId = $this->decodeString($encodedString);
         if (!$userId) {
             return abort(404);
         }
     
         $otpSentMessage = session('otp_sent_message'); // Retrieve the session data
         return Inertia::render('Auth/OtpVerification', ['userId' => $encodedString, 'otpSentMessage' => $otpSentMessage]);
     }
     
    

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try {
            $request->authenticate();
            $request->session()->regenerate();
    
            $user = Auth::user();
    
            if ($user->is_admin) {
                $admin = Admin::where('user_id', $user->id)->first();
    
                if ($admin) {
                    if ($admin->title === 'serviceprovider_admin') {
                        $serviceProvider = ServiceProvider::where('user_id', $user->id)->first();
    
                        if ($serviceProvider && $serviceProvider->is_approved) {
                            // Service provider admin and is verified
                            return $this->handleOtpVerification($user);
                        } else {
                            // Service provider admin but not verified
                            return Inertia::render('Errors/ApprovalPending');
                        }
                    } else {
                        // General admin
                        return $this->handleOtpVerification($user);
                    }
                }
            }
    
            return Redirect::intended(RouteServiceProvider::HOME);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors (e.g., wrong password)
            return Redirect::back()->withErrors(['email' => 'Invalid email or password']);
        } catch (\Exception $e) {
            dd($e);
            return Redirect::back()->withErrors(['email' => 'Something went wrong. Please try again.']);
        }
    }
    
    
    protected function handleOtpVerification($user)
    {
        $otp = $this->generateAndSaveOtp($user->id, $user->email);
        $encodedString = $this->encodeString($user->id);
        return Redirect::route('otp.verification', ['userId' => $encodedString]);
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

        $userId = $this->decodeString($request->userId);
        if (!$userId) {
            return response()->json(['error' => 'Invalid user ID'], 400);
        }

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
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception('Invalid email address.');
        }

        $otp = rand(100000, 999999);
        Mail::to($email)->send(new SendOtp($otp));
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
        $user = Auth::user();
        $password = $request->input('password');

        if (Hash::check($password, $user->password)) {
            $request->session()->forget('screen_locked');

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

    private function encodeString($userId)
    {
        $nonce = Str::random(10);
        $timestamp = time();
        return base64_encode($userId . '|' . $nonce . '|' . $timestamp);
    }

    private function decodeString($encodedString)
    {
        $decoded = base64_decode($encodedString);
        $parts = explode('|', $decoded);
        if (count($parts) === 3) {
            return $parts[0]; // Return the user ID part
        }
        return null;
    }
}