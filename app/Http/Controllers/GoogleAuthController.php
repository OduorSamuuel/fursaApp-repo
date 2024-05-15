<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback()
    {
        
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

           
            $user = User::where('google_id', $googleUser->getId())->first();

            if (!$user) {
               
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                ]);
            }

            
            Auth::login($user);

            // Redirect the user to the intended URL
            return redirect()->intended('home');
        } catch (\Throwable $th) {
            // Handle exceptions
            return back()->with('error', 'Something went wrong: ' . $th->getMessage());
        }
    }
}
