<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureScreenIsUnlocked
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->session()->has('screen_locked')) {
            return redirect()->route('admin.locked');
        }

        return $next($request);
    }
}
