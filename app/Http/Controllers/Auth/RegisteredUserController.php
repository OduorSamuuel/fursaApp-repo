<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Mail\UserVerification;
use App\Models\Admin;
use App\Models\Role;
use App\Models\ServiceProvider;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class RegisteredUserController extends Controller
{
    public function createClient(): Response
    {
        return Inertia::render('Auth/RegisterClient');
    }
    public function storeClient(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $username = explode('@', $request->email)[0];
        $verificationToken = Str::random(60);

        try {
            $user = User::create([
                'name' => $request->name,
                'username' => $username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'uuid' => Str::uuid(),
                'verification_token' => $verificationToken,
                'token_expiration_time' => now()->addHours(24),
                'is_verified' => false,
                'is_admin' => false,
            ]);

            $tokenLink = route('verification', ['token' => $verificationToken]);

            try {
                Mail::to($user->email)->send(new UserVerification($tokenLink));
            } catch (\Exception $e) {
                return back()->with('error', 'Registration successful, but the verification email could not be sent.');
            }

            return redirect()->back()->with('success', 'Registration successful. Please check your email for verification.');

        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong during user creation. Please try again.');
        }
    }
    public function storeServiceProvider(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', 'min:8'],
            'company_name' => 'required|string|max:255',
            'service_type' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        $username = explode('@', $request->email)[0];
        $verificationToken = Str::random(60);
    
        try {
            $user = User::create([
                'name' => $request->name,
                'username' => $username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'uuid' => Str::uuid(),
                'verification_token' => $verificationToken,
                'token_expiration_time' => now()->addHours(24),
                'is_verified' => false,
                'is_admin' => true,
            ]);
    
            ServiceProvider::create([
                'user_id' => $user->id,
                'company_name' => $request->company_name,
                'service_type' => $request->service_type,
                'contact_number' => $request->contact_number,
                'address' => $request->address,
                'is_approved' => false,
            ]);
            $tokenLink = route('verification', ['token' => $verificationToken]);
    
            try {
                Mail::to($user->email)->send(new UserVerification($tokenLink));
            } catch (\Exception $e) {
                return back()->with('error', 'Registration successful, but the verification email could not be sent.');
            }
    
            return redirect()->back()->with('success', 'Registration successful. Please check your email for verification.');
    
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong during user creation. Please try again.');
        }
    }
    

private function generateUniqueVerificationToken()
    {
        // Generate a unique verification token here
        return Str::random(60);
    }
}
