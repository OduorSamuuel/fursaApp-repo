<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\VerificationEmail;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['status' => 'already-verified']);
        }

        // Generate unique verification token
        $verificationToken = $this->generateUniqueVerificationToken();

        // Create a new user
        $user = new User();
        $user->email = $request->user()->email; // Use authenticated user's email
        $user->password = $request->user()->password; // Use authenticated user's hashed password
        $user->verification_token = $verificationToken;
        $user->token_expiration_time = now()->addHours(24);
        $user->is_verified = false;
        $user->role = false;
        $user->save();

        $tokenLink = route('verify', ['token' => $verificationToken]);

        try {
            // Send verification email
            Mail::to($user->email)->send(new VerificationEmail($tokenLink));

            return response()->json(['status' => 'verification-link-sent']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Registration successful, but the verification email could not be sent.']);
        }
    }

    private function generateUniqueVerificationToken()
    {
        $token = Str::random(40);

        while (User::where('verification_token', $token)->exists()) {
            $token = Str::random(40);
        }

        return $token;
    }
}
