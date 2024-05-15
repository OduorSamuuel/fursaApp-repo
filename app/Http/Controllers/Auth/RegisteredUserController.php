<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmail;
use App\Http\Controllers\Controller;
use App\Mail\UserVerification;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    
        // Extracting username from email address
        $emailParts = explode('@', $request->email);
        $username = $emailParts[0]; // Taking the part before the '@' symbol as username
    
        $verificationToken = $this->generateUniqueVerificationToken();
    
        $imagePath = public_path('Images/logo-color.png');
        $imageData = file_get_contents($imagePath);
        $base64Image = base64_encode($imageData);
        $user = User::create([
            'name' => $request->name,
            'username' => $username, // Using extracted username
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'uuid' => Str::uuid(), 
            'verification_token' => $verificationToken,
            'token_expiration_time' => now()->addHours(24),
            'is_verified' => false,
            'role' => false,
        ]);
    
        event(new Registered($user));
    
        // Send verification email
        $tokenLink = route('verification', ['token' => $verificationToken]);
        try {
            Mail::to($user->email)->send(new UserVerification($tokenLink));
    
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Registration successful, but the verification email could not be sent.');
        }
    
   
        return redirect()->route('register')->with('success', 'Registration successful. Please check your email for verification.');
    }
    

    /**
     * Generate a unique verification token.
     *
     * @return string
     */
    private function generateUniqueVerificationToken(): string
    {
        do {
            $token = Str::random(40);
        } while (User::where('verification_token', $token)->exists());

        return $token;
    }
}
