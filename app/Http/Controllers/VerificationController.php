<?php
// VerificationController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function verify(Request $request, $token)
    
    {
        $user = User::where('verification_token', $token)->first();

        if (!$user) {
            return Inertia::render('Verification', ['error' => 'Invalid verification token.']);
        }

        // If the user is already verified, return a different message
        if ($user->is_verified) {
            return Inertia::render('Verification', ['error' => 'Email already verified.']);
        }

        $user->update(['is_verified' => true, 'verification_token' => null]);

        // Return success message
        return Inertia::render('Verification', ['success' => 'Email verification successful.']);
    }
}
