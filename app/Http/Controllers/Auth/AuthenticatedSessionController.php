<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Admin;
use App\Models\ServiceProvider;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
  /**
 * Handle an incoming authentication request.
 */
public function store(LoginRequest $request)
{
    $request->authenticate();

    $request->session()->regenerate();

    // Render dashboard based on user's role
    $user = Auth::user();
    if ($user->is_admin) {
        $admin = Admin::where('user_id', $user->id)->first();
        if ($admin) {
            // Check admin type
            if ($admin->title === 'serviceprovider_admin') {
                $serviceProvider = ServiceProvider::where('user_id', $user->id)->first();
                if ($serviceProvider && $serviceProvider->is_approved) {
                    return Redirect::intended(RouteServiceProvider::Dashboard);
                } else {
                    return Inertia::render('Errors/ApprovalPending');
                }
            } elseif ($admin->title === 'general_admin') {
                return Redirect::intended(RouteServiceProvider::adminDashboard);
            }
        }
    }

    // If no specific dashboard, redirect to intended URL or home
    return Redirect::intended(RouteServiceProvider::HOME); 
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->user()->update([
            'last_seen_at' => now(),
        ]);

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
