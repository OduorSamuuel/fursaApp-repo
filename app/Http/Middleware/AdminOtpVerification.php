<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminOtpVerification
{
    public function handle($request, Closure $next)
    {
        // Check if the user is logged in and is an admin
        $user = Auth::user();
        if ($user && $user->is_admin) {
            // Check if OTP verification is required
            if (!$request->session()->has('otp_verified')) {
                // Redirect to OTP verification page
                return redirect()->route('otp.verification', ['userId' => $user->id]);
            }
        }

        return $next($request);
    }
}
