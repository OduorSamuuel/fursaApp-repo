<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use App\Models\User;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Ensure the user is loaded with the admin relationship if the user is authenticated
        if ($user) {
            $user = User::with('admin')->find($user->id);
        }

        $adminTitle = null;
    
        if ($user && $user->is_admin) {
            $adminTitle = $user->admin ? $user->admin->title : null;
        }
    
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'adminTitle' => $adminTitle,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
