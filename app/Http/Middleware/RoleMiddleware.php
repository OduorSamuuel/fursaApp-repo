<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$titles)
    {
        $user = Auth::user();
        
        // Check if the user is authenticated
        if (!$user) {
            return redirect('/login');
        }

        // Check if the user is an admin
        if (!$user->is_admin) {
            return redirect('/'); 
        }

        // Check if the user's title matches any of the provided titles
        foreach ($titles as $title) {
            if ($user->admin->title === $title) {
                return $next($request);
            }
        }

        // If the user's title does not match any of the provided titles, redirect to home
        return redirect('/');
    }
}
